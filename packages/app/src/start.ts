import {NodeEnv} from '@test/env';

export class DoSomething {
  constructor(public nodeEnv: NodeEnv = new NodeEnv()) {
    console.log(this.nodeEnv.NODE_ENV);
    const x = new NodeEnv();
    console.log(`x.NODE_ENV => ${x.NODE_ENV}`)
  }
}

const dosomething = new DoSomething();
console.log(`dosomething.nodeEnv.NODE_ENV => ${dosomething.nodeEnv.NODE_ENV}`);
console.log(`dosomething.nodeEnv.OTHER => ${dosomething.nodeEnv.OTHER}`);
