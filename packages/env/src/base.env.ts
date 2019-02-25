import {cleanEnv, str, bool, num, email, host, port, url, Spec} from 'envalid';
import {EnvConfig, GENERIC_ENV} from './types';
import {resolve} from 'path';
import * as debugModule from 'debug';

const debug = debugModule('cce:env:base');

export class BaseEnv {
  protected _env: NodeJS.ProcessEnv;
  private DOT_ENV_PATH = resolve(__dirname, '../../.env');

  constructor(props: GENERIC_ENV, env?: NodeJS.ProcessEnv, config?: EnvConfig) {
    debug('dotenv path =>', this.DOT_ENV_PATH);

    const defaultConfig: EnvConfig = {loadDotEnvWithOverride: false, validateWithOverride: false};
    config = Object.assign({}, defaultConfig, config);

    let map = this.createValidationMap(props);
    debug('===== map =====');
    debug(map);
    debug('===== map =====');

    let options: any = {dotEnvPath: this.DOT_ENV_PATH};

    if (env && !config.validateWithOverride) {
      map = {};
    }

    if (debug.enabled) {
      debug('==== env =====');
      debug(env);
      debug('==== env =====');
    }

    if (env && config.loadDotEnvWithOverride) {
      options = {dotEnvPath: null};
    }

    debug('===== options =====');
    debug(options);
    debug('===== options =====');

    env = env || process.env;

    this._env = cleanEnv(env, map, options);

    Object.assign(this, this._env);
  }

  private createValidationMap(props: GENERIC_ENV) {
    const map: any = {};

    Object.entries(props).forEach(([key, value]) => {
      if (value.type === 'string') {
        map[key] = str(value as Spec<string>);
      } else if (value.type === 'boolean') {
        map[key] = bool(value as Spec<boolean>);
      } else if (value.type === 'number') {
        map[key] = num(value as Spec<number>);
      } else if (value.type === 'email') {
        map[key] = email(value as Spec<string>);
      } else if (value.type === 'host') {
        map[key] = host(value as Spec<string>);
      } else if (value.type === 'port') {
        map[key] = port(value as Spec<number>);
      } else if (value.type === 'url') {
        map[key] = url(value as Spec<string>);
      }
    });

    return map;
  }
}
