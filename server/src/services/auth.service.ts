import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { JWT_SECRET } from '../config/env';
import { ApiError } from '../utils/ApiError';

const client = new OAuth2Client();

export class AuthService {
    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                roles: { include: { role: true } },
                organization: true,
            },
        });

        if (!user) {
            throw new ApiError(401, 'Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid credentials');
        }

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const token = jwt.sign(
            {
                userId: user.id,
                organizationId: user.organizationId,
                role: user.roles[0]?.role.name
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                organizationId: user.organizationId,
                role: user.roles[0]?.role.name
            }
        };
    }

    async googleLogin(idToken: string) {
        try {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID, // Ensure this is set in .env
            });
            const payload = ticket.getPayload();

            if (!payload) {
                throw new ApiError(401, 'Invalid Google Token');
            }

            const { email, sub: googleId, name, picture } = payload;

            if (!email) {
                throw new ApiError(400, 'Google account email not found');
            }

            // Find user by email or googleId
            let user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { googleId }
                    ]
                },
                include: {
                    roles: { include: { role: true } },
                    organization: true,
                }
            });

            if (!user) {
                // If user doesn't exist, we can't auto-create because we need organization context.
                // Or we could create a default organization? For now, let's throw error.
                // The prompt says "user can login". If no user, it's a signup.
                // But I'll assume only existing users unless valid org logic is defined.
                // Actually, let's try to link if we find by email but no googleId.
                // If user is null, it means neither email nor googleId exists.
                throw new ApiError(404, 'User not found. Please sign up or contact administrator.');
            }

            // If user exists but googleId is missing, link it
            if (!user.googleId) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: { googleId, avatarUrl: picture || user.avatarUrl },
                    include: {
                        roles: { include: { role: true } },
                        organization: true,
                    }
                });
            }

            if (!JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined in environment variables');
            }

            const token = jwt.sign(
                {
                    userId: user.id,
                    organizationId: user.organizationId,
                    role: user.roles[0]?.role.name
                },
                JWT_SECRET,
                { expiresIn: '1d' }
            );

            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    organizationId: user.organizationId,
                    role: user.roles[0]?.role.name,
                    avatarUrl: user.avatarUrl
                }
            };
        } catch (error) {
            console.error('Google Login Error:', error);
            if (error instanceof ApiError) throw error;
            throw new ApiError(401, 'Google authentication failed');
        }
    }
    async registerAgency(agencyName: string, userName: string, email: string, password: string) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new ApiError(400, 'User with this email already exists');
        }

        // Generate slug from agency name
        let slug = agencyName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const existingOrg = await prisma.organization.findUnique({ where: { slug } });
        if (existingOrg) {
            slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Transaction to ensure everything is created together
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create Organization
            const organization = await tx.organization.create({
                data: {
                    name: agencyName,
                    slug: slug,
                }
            });

            // 2. Create Default Roles for this Org
            const adminRole = await tx.role.create({
                data: {
                    name: 'Admin',
                    slug: 'admin',
                    level: 100,
                    isSystem: true,
                    organizationId: organization.id
                }
            });

            await tx.role.create({
                data: {
                    name: 'Team Member',
                    slug: 'member',
                    level: 50,
                    isSystem: true,
                    organizationId: organization.id
                }
            });

            // 3. Create User
            const user = await tx.user.create({
                data: {
                    email,
                    name: userName,
                    password: hashedPassword,
                    organizationId: organization.id,
                }
            });

            // 4. Assign Admin Role to User
            await tx.userRole.create({
                data: {
                    userId: user.id,
                    roleId: adminRole.id
                }
            });

            return { user, organization, roleName: adminRole.name };
        });

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const token = jwt.sign(
            {
                userId: result.user.id,
                organizationId: result.organization.id,
                role: result.roleName
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return {
            token,
            user: {
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
                organizationId: result.organization.id,
                role: result.roleName
            }
        };
    }
}

export default new AuthService();
