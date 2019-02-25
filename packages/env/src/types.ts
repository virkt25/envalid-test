export type EnvType = 'string' | 'boolean' | 'number' | 'email' | 'host' | 'port' | 'url';

export type ExtendedEnvType<T> = {
  choices?: T[];
  default?: T;
  devDefault?: T;
  example?: T;
  desc?: string;
  docs?: string;
  type: EnvType;
};

export interface GENERIC_ENV {
  [key: string]: ExtendedEnvType<string> | ExtendedEnvType<number> | ExtendedEnvType<boolean>;
}

export type EnvDefinition<T> = {
  [K in keyof T]: ExtendedEnvType<string> | ExtendedEnvType<number> | ExtendedEnvType<boolean>
};

export type EnvConfig = {
  loadDotEnvWithOverride?: boolean;
  validateWithOverride?: boolean;
};
