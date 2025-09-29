export type SkillCategory = 'Development' | 'Design' | 'Marketing' | 'Strategy' | 'Management';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

export const AVAILABLE_SKILLS: Skill[] = [
  // Development
  { id: 'dev-01', name: 'React', category: 'Development' },
  { id: 'dev-02', name: 'Node.js', category: 'Development' },
  { id: 'dev-03', name: 'TypeScript', category: 'Development' },
  { id: 'dev-04', name: 'Python', category: 'Development' },
  { id: 'dev-05', name: 'System Architecture', category: 'Development' },
  { id: 'dev-06', name: 'AWS', category: 'Development' },
  { id: 'dev-07', name: 'Database Design', category: 'Development' },
  { id: 'dev-08', name: 'DevOps', category: 'Development' },

  // Design
  { id: 'des-01', name: 'UI/UX Design', category: 'Design' },
  { id: 'des-02', name: 'Brand Design', category: 'Design' },
  { id: 'des-03', name: 'Art Direction', category: 'Design' },
  { id: 'des-04', name: 'Prototyping', category: 'Design' },
  { id: 'des-05', name: 'Design Systems', category: 'Design' },
  { id: 'des-06', name: 'Figma', category: 'Design' },
  { id: 'des-07', name: 'Adobe Creative Suite', category: 'Design' },

  // Marketing
  { id: 'mkt-01', name: 'Digital Marketing', category: 'Marketing' },
  { id: 'mkt-02', name: 'Content Strategy', category: 'Marketing' },
  { id: 'mkt-03', name: 'SEO', category: 'Marketing' },
  { id: 'mkt-04', name: 'Social Media Management', category: 'Marketing' },
  { id: 'mkt-05', name: 'PPC Advertising', category: 'Marketing' },

  // Strategy
  { id: 'str-01', name: 'Business Strategy', category: 'Strategy' },
  { id: 'str-02', name: 'Market Research', category: 'Strategy' },
  { id: 'str-03', name: 'Data Analysis', category: 'Strategy' },
  { id: 'str-04', name: 'UX Research', category: 'Strategy' },

  // Management
  { id: 'mgt-01', name: 'Team Leadership', category: 'Management' },
  { id: 'mgt-02', name: 'Project Management', category: 'Management' },
  { id: 'mgt-03', name: 'Client Relations', category: 'Management' },
  { id: 'mgt-04', name: 'Business Development', category: 'Management' },
];
