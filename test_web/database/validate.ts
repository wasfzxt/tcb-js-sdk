import * as assert from 'power-assert';
import { register } from '../util';
import { Validate } from '../../src/database/validate';
import { ErrorCode } from '../../src/database/constant';

export function registerValidate() {
  register('database validate: isFieldOrder - is valid', () => {
    try {
      Validate.isFieldOrder('desc');
    } catch (e) {
      assert(e.message === ErrorCode.DirectionError);
    }
  });

  register('database validate: isFieldOrder - is invalid', () => {
    try {
      Validate.isFieldOrder('desd' as any);
    } catch (e) {
      assert(e.message === ErrorCode.DirectionError);
    }
  });

  register('database validate: isOperator - is valid', () => {
    assert(Validate.isOperator('<') === true);
  });

  register('database validate: isOperator - is invalid', () => {
    try {
      Validate.isOperator('>+' as any);
    } catch (error) {
      assert(error.message === ErrorCode.OpStrError);
    }
  });

  register('database validate: isCollName - should right', () => {
    assert(Validate.isCollName('coll-1_2') === true);
  });

  register('database validate: isCollName - can not use _ in begin', () => {
    try {
      Validate.isCollName('_coll-1');
    } catch (error) {
      assert(error.message === ErrorCode.CollNameError);
    }
  });

  register('database validate: isCollName - can not use @#$ and so on', () => {
    try {
      Validate.isCollName('coll-1_@#$');
    } catch (error) {
      assert(error.message === ErrorCode.CollNameError);
    }
  });

  register('database validate: isCollName - can not empty', () => {
    try {
      Validate.isCollName('');
    } catch (error) {
      assert(error.message === ErrorCode.CollNameError);
    }
  });

  register('database validate: isCollName - can not more than 32', () => {
    let name = 'abcdefgh12abcdefgh12abcdefgh12abcdefgh12';
    try {
      Validate.isCollName(name);
    } catch (error) {
      assert(error.message === ErrorCode.CollNameError);
    }
  });

  register('database validate: isDocID - should right', () => {
    const docId = 'abcdefABCDEF0123456789ab';
    try {
      Validate.isDocID(docId);
    } catch (error) {
      assert(error.message === ErrorCode.DocIDError);
    }
  });

  register('database validate: isDocID - can not empty', () => {
    try {
      Validate.isDocID('');
    } catch (error) {
      assert(error.message === ErrorCode.DocIDError);
    }
  });

  register('database validate: isDocID - can not more than 24', () => {
    const docId = 'abcdefABCDEF0123456789abcdef';
    try {
      Validate.isDocID(docId);
    } catch (error) {
      assert(error.message === ErrorCode.DocIDError);
    }
  });

  register('database validate: isDocID - can not use @#$ and so on', () => {
    const docId = 'abcdefABCDEF0123456789@#';
    try {
      Validate.isDocID(docId);
    } catch (error) {
      assert(error.message === ErrorCode.DocIDError);
    }
  });
}
