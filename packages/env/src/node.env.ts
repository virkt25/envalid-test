import {BaseEnv} from './base.env';
import {EnvDefinition, EnvConfig} from './types';

/**
 * Interface for the NODE Environment
 */
export interface NODE {
  NODE_ENV: string;
  OTHER: string;
}

/**
 * Environment Definition for the NODE Environment
 */
export const NodeEnvDefinition: EnvDefinition<NODE> = {
  NODE_ENV: {
    type: 'string',
    default: 'development',
    choices: ['development', 'test', 'production', 'staging'],
  },
  OTHER: {
    type: 'string',
  },
};

/**
 * Class for the NODE Environment
 */
export class NodeEnv extends BaseEnv implements NODE {
  NODE_ENV!: string;
  OTHER!: string;

  constructor(override?: Partial<NODE>, config?: EnvConfig) {
    super(NodeEnvDefinition, override as NodeJS.ProcessEnv, config);
  }
}
