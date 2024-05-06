export type TMayFail<S, E> = Success<S, E> | Fail<S, E>

type MayfailFunction<S1, S2, E> =
  (s: S1) => Success<S2, any> | Fail<any, E>

type MayfailAsyncFunction<S1, S2, E> =
  (s: S1) => Promise<Success<S2, any> | Fail<any, E>>

type ExtendScope<Scope, NewValue, NewKey extends string> =
  Scope & { [key in NewKey]: NewValue }

type ExtendScopeV<Scope, MayFail extends TMayFail<any, any>, NewKey extends string> =
  ExtendScope<Scope, ExtractSuccessTypeV<MayFail>, NewKey>

type ExtendScopeF<Scope, MayFail extends (...args: any[]) => TMayFail<any, any>, NewKey extends string> =
  ExtendScope<Scope, ExtractSuccessTypeF<MayFail>, NewKey>

type ExtendScopeA<Scope, MayFail extends (...args: any[]) => Promise<TMayFail<any, any>>, NewKey extends string> =
  ExtendScope<Scope, ExtractSuccessTypeA<MayFail>, NewKey>

type ExtractSuccessTypeF<MayFail extends (...args: any[]) => TMayFail<any, any>> =
  MayFail extends (...args: any[]) => (Success<infer S, any> | Fail<any, any>)
  ? S
  : never

type ExtractErrorTypeF<MayFail extends (...args: any[]) => TMayFail<any, any>> =
  MayFail extends (...args: any[]) => Success<any, any> | Fail<any, infer E>
  ? E
  : never

type ExtractSuccessTypeA<MayFail extends (...args: any[]) => Promise<Success<any, any> | Fail<any, any>>> =
  MayFail extends (...args: any[]) => Promise<Success<infer S, any> | Fail<any, any>>
  ? S
  : never

type ExtractErrorTypeA<MayFail extends (...args: any[]) => Promise<TMayFail<any, any>>> =
  MayFail extends (...args: any[]) => Promise<Success<any, any> | Fail<any, infer E>>
  ? E
  : never

type ToFunction<T> = () => T
// weird hack, typescript cannot infer type with: Success<infer S, any> | Fail<any, any>
// but can with () => Success<infer S, any> | Fail<any, any>
// therefore Success<infer S, any> | Fail<any, any> is converted to function
type ExtractSuccessTypeV<MayFail extends TMayFail<any, any>> = ExtractSuccessTypeF<ToFunction<MayFail>>
export type ExtractErrorTypeV<MayFail extends TMayFail<any, any>> = ExtractErrorTypeF<ToFunction<MayFail>>

type PassError<PrevErr, NewErr> = unknown extends PrevErr ? NewErr : PrevErr
/*
type _P1 = PassError<unknown, number> // number
type _P2 = PassError<any, number> // number
type _P3 = PassError<never, number> // never
type _P4 = PassError<string, number> // string
type _P5 = PassError<string[], number> // string
*/

interface Chaining<S, E> {
  assignV: <Other extends Success<any, unknown> | Fail<unknown, E>, KeyName extends string>
    (k: KeyName, other: Other)
    => TMayFail<ExtendScopeV<S, Other, KeyName>, PassError<E, ExtractErrorTypeV<Other>>>

  assignF: <Fce extends MayfailFunction<S, any, E>, KeyName extends string>
    (k: KeyName, fce: Fce)
    => TMayFail<ExtendScopeF<S, Fce, KeyName>, PassError<E, ExtractErrorTypeF<Fce>>>

  retV: <Other extends Success<any, unknown> | Fail<unknown, E>>
    (other: Other)
    => TMayFail<ExtractSuccessTypeV<Other>, PassError<E, ExtractErrorTypeV<Other>>>

  retF: <Fce extends MayfailFunction<S, any, E>>
    (fce: Fce)
    => TMayFail<ExtractSuccessTypeF<Fce>, PassError<E, ExtractErrorTypeF<Fce>>>

  // asyncAssignF: <Fce extends MayfailAsyncFunction<S, any, E>, KeyName extends string>
  //   (k: KeyName, fce: Fce)
  //   => MayFailPromise<ExtendScopeA<S, Fce, KeyName>, PassError<E, ExtractErrorTypeA<Fce>>>

  transformError: <E2>(fce: (error: E) => E2) => TMayFail<S, E2>
}

interface AsyncChaining<S, E> {
  assignV: <Other extends Success<any, unknown> | Fail<unknown, E>, KeyName extends string>
    (k: KeyName, other: Other)
    => MayFailPromise<ExtendScopeV<S, Other, KeyName>, PassError<E, ExtractErrorTypeV<Other>>>

  assignF: <Fce extends MayfailFunction<S, any, E>, KeyName extends string>
    (k: KeyName, fce: Fce)
    => MayFailPromise<ExtendScopeF<S, Fce, KeyName>, PassError<E, ExtractErrorTypeF<Fce>>>

  retV: <Other extends Success<any, unknown> | Fail<unknown, E>>
    (other: Other)
    => MayFailPromise<ExtractSuccessTypeV<Other>, PassError<E, ExtractErrorTypeV<Other>>>

  retF: <Fce extends MayfailFunction<S, any, E>>
    (fce: Fce)
    => MayFailPromise<ExtractSuccessTypeF<Fce>, PassError<E, ExtractErrorTypeF<Fce>>>

  asyncAssignF: <Fce extends MayfailAsyncFunction<S, any, E>, KeyName extends string>
    (k: KeyName, fce: Fce)
    => MayFailPromise<ExtendScopeA<S, Fce, KeyName>, PassError<E, ExtractErrorTypeA<Fce>>>

  transformError: <E2>
    (fce: (error: E) => E2)
    => MayFailPromise<S, E2>
}

function assignV
  <S, E, Other extends Success<any, unknown> | Fail<unknown, E>, KeyName extends string>
  (current: TMayFail<S, E>, k: KeyName, other: Other)
  : TMayFail<ExtendScopeV<S, Other, KeyName>, PassError<E, ExtractErrorTypeV<Other>>> {
  if (current.isFail()) {
    return current as TMayFail<ExtendScopeV<S, Other, KeyName>, PassError<E, ExtractErrorTypeV<Other>>>
  }
  if (other.isFail()) {
    return other as TMayFail<ExtendScopeV<S, Other, KeyName>, PassError<E, ExtractErrorTypeV<Other>>>
  }
  return MayFail.Success(Object.assign(
    {}, current.value, { [k.toString()]: other.value }
  ) as any)
}

function assignF
  <S, E, Fce extends MayfailFunction<S, any, E>, KeyName extends string>
  (current: TMayFail<S, E>, k: KeyName, fce: Fce)
  : TMayFail<ExtendScopeF<S, Fce, KeyName>, PassError<E, ExtractErrorTypeF<Fce>>> {
  type S2 = ExtractSuccessTypeF<Fce>
  if (current.isFail()) { return current as TMayFail<ExtendScopeF<S, Fce, KeyName>, PassError<E, ExtractErrorTypeF<Fce>>> }
  const result = fce(current.value) as TMayFail<S2, E>
  return assignV<S, E, TMayFail<any, any>, KeyName>(current, k, result) as TMayFail<ExtendScopeF<S, Fce, KeyName>, PassError<E, ExtractErrorTypeF<Fce>>>;
}

function retV
  <S, E, Other extends Success<any, unknown> | Fail<unknown, E>>
  (current: TMayFail<S, E>, other: Other)
  : TMayFail<ExtractSuccessTypeV<Other>, PassError<E, ExtractErrorTypeV<Other>>> {
  type R = TMayFail<ExtractSuccessTypeV<Other>, PassError<E, ExtractErrorTypeV<Other>>>
  if (current.isFail()) { return current as R }
  return other as R;
}

function retF
  <S, E, Fce extends MayfailFunction<S, any, E>>
  (current: TMayFail<S, E>, fce: Fce)
  : TMayFail<ExtractSuccessTypeF<Fce>, PassError<E, ExtractErrorTypeF<Fce>>> {
  type R = TMayFail<ExtractSuccessTypeF<Fce>, PassError<E, ExtractErrorTypeF<Fce>>>
  if (current.isFail()) {
    return current as R;
  }
  return fce(current.value) as R
}

function transformError<S, E, E2>(current: TMayFail<S, E>, fce: (error: E) => E2): TMayFail<S, E2> {
  if (current.isSuccess()) {
    return current as unknown as TMayFail<S, E2>;
  }
  const newErr = fce(current.value)
  return MayFail.Error<S, E2>(newErr);
}

function asyncAssignF
  <S, E, Fce extends MayfailAsyncFunction<S, any, E>, KeyName extends string>
  (current: TMayFail<S, E> | Promise<TMayFail<S, E>>, k: KeyName, fce: Fce)
  : MayFailPromise<ExtendScopeA<S, Fce, KeyName>, PassError<E, ExtractErrorTypeA<Fce>>> {
  type R = TMayFail<ExtendScopeA<S, Fce, KeyName>, PassError<E, ExtractErrorTypeA<Fce>>>
  return new MayFailPromise<ExtendScopeA<S, Fce, KeyName>, PassError<E, ExtractErrorTypeA<Fce>>>(async resolve => {
    const _current = current instanceof Promise ? await current : current
    if (_current.isFail()) {
      resolve(_current as R);
      return
    }
    const result = await fce(_current.value)
    resolve(assignV<S, E, TMayFail<any, any>, KeyName>(_current, k, result))
  })
}

class MayFailPromise<S, E> extends Promise<TMayFail<S, E>> implements AsyncChaining<S, E> {
  public assignV
    <Other extends Success<any, any> | Fail<unknown, E>, KeyName extends string>
    (k: KeyName, other: Other)
    : MayFailPromise<ExtendScopeV<S, Other, KeyName>, PassError<E, ExtractErrorTypeV<Other>>> {
    return new MayFailPromise<ExtendScopeV<S, Other, KeyName>, PassError<E, ExtractErrorTypeV<Other>>>(async resolve => {
      const current = await this as TMayFail<S, E>;
      resolve(assignV<S, E, Other, KeyName>(current, k, other))
    })
  }

  public assignF
    <Fce extends MayfailFunction<S, any, E>, KeyName extends string>
    (k: KeyName, fce: Fce)
    : MayFailPromise<ExtendScopeF<S, Fce, KeyName>, PassError<E, ExtractErrorTypeF<Fce>>> {
    return new MayFailPromise<ExtendScopeF<S, Fce, KeyName>, PassError<E, ExtractErrorTypeF<Fce>>>(async resolve => {
      //const current = await this
      resolve(assignF<S, E, Fce, KeyName>(await this, k, fce))
    })
  }

  public retV<Other extends Success<any, unknown> | Fail<unknown, E>>
    (other: Other)
    : MayFailPromise<ExtractSuccessTypeV<Other>, PassError<E, ExtractErrorTypeV<Other>>> {
    return new MayFailPromise<ExtractSuccessTypeV<Other>, PassError<E, ExtractErrorTypeV<Other>>>(async resolve => {
      resolve(retV<S, E, Other>(await this, other))
    })
  }

  public retF<Fce extends MayfailFunction<S, any, E>>
    (fce: Fce)
    : MayFailPromise<ExtractSuccessTypeF<Fce>, PassError<E, ExtractErrorTypeF<Fce>>> {
    return new MayFailPromise<ExtractSuccessTypeF<Fce>, PassError<E, ExtractErrorTypeF<Fce>>>(async resolve => {
      resolve(retF<S, E, Fce>(await this, fce))
    })
  }

  public asyncAssignF<Fce extends MayfailAsyncFunction<S, any, E>, KeyName extends string>
    (k: KeyName, fce: Fce)
    : MayFailPromise<ExtendScopeA<S, Fce, KeyName>, PassError<E, ExtractErrorTypeA<Fce>>> {
    return asyncAssignF<S, E, Fce, KeyName>(this, k, fce)
  }

  public transformError<E2>
    (fce: (error: E) => E2)
    : MayFailPromise<S, E2> {
    return new MayFailPromise<S, E2>(async resolve => {
      resolve(transformError<S, E, E2>(await this, fce))
    });
  }
}

class Success<S, E> implements Chaining<S, E> {
  private _value: S
  get value(): S { return this._value }
  public isSuccess(): this is Success<S, E> { return true }
  public isFail(): this is Fail<S, E> { return false }
  constructor(value: S) {
    this._value = value;
  }

  public assignV
    <Other extends Success<any, any> | Fail<unknown, E>, KeyName extends string>
    (k: KeyName, other: Other)
    : TMayFail<ExtendScopeV<S, Other, KeyName>, PassError<E, ExtractErrorTypeV<Other>>> {
    return assignV<S, E, Other, KeyName>(this, k, other)
  }

  public assignF
    <Fce extends MayfailFunction<S, any, E>, KeyName extends string>
    (k: KeyName, fce: Fce)
    : TMayFail<ExtendScopeF<S, Fce, KeyName>, PassError<E, ExtractErrorTypeF<Fce>>> {
    return assignF<S, E, Fce, KeyName>(this, k, fce)
  }

  public retV<Other extends Success<any, unknown> | Fail<unknown, E>>
    (other: Other)
    : TMayFail<ExtractSuccessTypeV<Other>, PassError<E, ExtractErrorTypeV<Other>>> {
    return retV<S, E, Other>(this, other);
  }

  public retF<Fce extends MayfailFunction<S, any, E>>
    (fce: Fce)
    : TMayFail<ExtractSuccessTypeF<Fce>, PassError<E, ExtractErrorTypeF<Fce>>> {
    return retF<S, E, Fce>(this, fce);
  }

  public asyncAssignF<Fce extends MayfailAsyncFunction<S, any, E>, KeyName extends string>
    (k: KeyName, fce: Fce)
    : MayFailPromise<ExtendScopeA<S, Fce, KeyName>, PassError<E, ExtractErrorTypeA<Fce>>> {
    return asyncAssignF<S, E, Fce, KeyName>(this, k, fce)
  }

  public transformError<E2>
    (fce: (error: E) => E2)
    : TMayFail<S, E2> {
    return transformError<S, E, E2>(this, fce)
  }
}

class Fail<S, E> implements Chaining<S, E> {
  private _error: E
  get value(): E { return this._error }
  public isSuccess(): this is Success<S, E> { return false }
  public isFail(): this is Fail<S, E> { return true }
  constructor(error: E) {
    this._error = error;
  }

  public assignV
    <Other extends Success<any, any> | Fail<unknown, E>, KeyName extends string>
    (k: KeyName, other: Other)
    : TMayFail<ExtendScopeV<S, Other, KeyName>, PassError<E, ExtractErrorTypeV<Other>>> {
    return assignV(this, k, other)
  }

  public assignF
    <Fce extends MayfailFunction<S, any, E>, KeyName extends string>
    (k: KeyName, fce: Fce)
    : TMayFail<ExtendScopeF<S, Fce, KeyName>, PassError<E, ExtractErrorTypeF<Fce>>> {
    return assignF<S, E, Fce, KeyName>(this, k, fce)
  }

  public retV<Other extends Success<any, unknown> | Fail<unknown, E>>
    (other: Other)
    : TMayFail<ExtractSuccessTypeV<Other>, PassError<E, ExtractErrorTypeV<Other>>> {
    return retV<S, E, Other>(this, other);
  }

  public retF<Fce extends MayfailFunction<S, any, E>>
    (fce: Fce)
    : TMayFail<ExtractSuccessTypeF<Fce>, PassError<E, ExtractErrorTypeF<Fce>>> {
    return retF<S, E, Fce>(this, fce);
  }
  // for some reaseon using PassError here creates lot of seemingly unrelated type errors
  public asyncAssignF<Fce extends MayfailAsyncFunction<S, any, E>, KeyName extends string>
    (k: KeyName, fce: Fce)
    : MayFailPromise<ExtendScopeA<S, Fce, KeyName>, E> {
    return asyncAssignF<S, E, Fce, KeyName>(this, k, fce)
  }

  public transformError<E2>
    (fce: (error: E) => E2)
    : TMayFail<S, E2> {
    return transformError<S, E, E2>(this, fce)
  }
}

export class MayFail {
  public static Success<S, E>(value: S) {
    return new Success<S, E>(value)
  }
  public static Error<S, E>(value: E) {
    return new Fail<S, E>(value)
  }
  public static do<E>() {
    return MayFail.Success<{}, E>({})
  }
}

export function success<S, E>(value: S) { return MayFail.Success<S, E>(value) }
export function err<S, E>(error: E) { return MayFail.Error<S, E>(error) }

let a = MayFail.do().retV(Math.random() > 0.5 ? MayFail.Success(1) : MayFail.Error('out of luck'));
let b = MayFail.do().assignV('x', a);

let aa = ''
let bb: unknown = aa

//let __x: TMayFail1<string, string> = new Success<string, string>('5')

MayFail.do().assignV('x', success(4)).assignF('y', s => {
  return a
})

MayFail.do().assignV('x', success(4)).asyncAssignF('y', async s => {
  //let r = err<number, string>('no') as TMayFail<number, string>
  let r = a
  return r
})

function test() {
  const assert = (b: boolean) => {
    if (!b) throw new Error('assertion failed')
  }
  let r = MayFail.do().assignV('x', MayFail.Success(5))
  assert(r.isSuccess() && r.value.x === 5)
  r = MayFail.do().assignF('x', () => MayFail.Success(10))
  assert(r.isSuccess() && r.value.x === 10)
  let r1 = MayFail.do().assignF('x', () => MayFail.Success(10)).retV(MayFail.Success(5))
  assert(r1.isSuccess() && r1.value === 5)
  r1 = MayFail.do().assignF('x', () => MayFail.Success(10)).retF(() => MayFail.Success(10))
  assert(r1.isSuccess() && r1.value === 10)
  let r2 = MayFail.do().assignF('x', () => MayFail.Success(10)).retF(() => MayFail.Error(10))
  assert(r2.isFail() && r2.value === 10)
  r2 = MayFail.do().assignF('x', () => MayFail.Error(10)).retF(() => MayFail.Error(10))
  assert(r2.isFail() && r2.value === 10)
  r2 = MayFail.do().assignV('x', MayFail.Error(10)).retF(() => MayFail.Error(10))
  assert(r2.isFail() && r2.value === 10)
  r2 = MayFail.do().assignF('x', () => MayFail.Success(10)).retV(MayFail.Error(11))
  assert(r2.isFail() && r2.value === 11)
  r2 = MayFail.do().assignF('x', () => MayFail.Success(10)).retV(MayFail.Error(11)).transformError(e => 2 * e)
  assert(r2.isFail() && r2.value === 22);

  (async () => {
    let r1 = await MayFail.do().asyncAssignF('x', async s => MayFail.Success(1))
    assert(r1.isSuccess() && r1.value.x === 1);
    let r2 = await MayFail.do().assignV('x', MayFail.Success(2)).asyncAssignF('y', async s => MayFail.Success(3))
    assert(r2.isSuccess() && r2.value.x === 2 && r2.value.y === 3);
    let r3 = await MayFail.do().assignV('x', MayFail.Success(4)).asyncAssignF('y', async s => MayFail.Success(5)).assignV('z', MayFail.Success(6))
    assert(r3.isSuccess() && r3.value.x === 4 && r3.value.y === 5 && r3.value.z === 6);
  })()
}
test()

let t1 = MayFail.do<number>()
  .assignV('x', MayFail.Success(5))
  .assignF('y', scope => scope.x > 5 ? MayFail.Success(scope.x * scope.x) : MayFail.Error(-1))
  .transformError(err => `${err}`);
if (t1.isSuccess()) {
  const v = t1.value
} else {
  const e: string = t1.value
}


MayFail.do().assignV('x', MayFail.Success(5)).retV(MayFail.Error(false))
MayFail.do().assignF('x', s => MayFail.Success(5))

MayFail.do()
  .assignV('x', 7 > 10 ? MayFail.Success(10) : MayFail.Error('10'))
  .assignV('ww', MayFail.Error(''))
  .assignF('y', scope => scope.x > 10 ? MayFail.Success(5) : MayFail.Success('a'))
  .assignF('z', scope => typeof scope.y === 'string' ? MayFail.Success(scope.y) : MayFail.Error('wrong'))
  .assignF('w', scope => scope.y === 5 ? MayFail.Success(scope.y) : MayFail.Error('10'))
  .retF(scope => {
    const x: number = scope.x
    const ww: unknown = scope.ww
    const y: number | string = scope.y
    const z: string = scope.z
    const w: number = scope.w
    if (scope.z === '') {
      return MayFail.Error('5')
    }

    return MayFail.Success(true)
  })

MayFail.do()
  .assignF('x', scope => 7 > 10 ? MayFail.Success(10) : MayFail.Error('10'))
  .assignF('y', scope => 7 > 10 ? MayFail.Success(10) : MayFail.Error('10'))
  .assignF('z', scope => {
    const x: number = scope.x
    const y: number = scope.y
    return MayFail.Success(true)
  })

let _t1 = MayFail.do<string>()
  .assignF('x', scope => 7 > 10 ? MayFail.Success(10) : MayFail.Error('10'))
  .assignF('y', scope => 7 > 10 ? MayFail.Success(10) : MayFail.Error('10'))
  .assignF('z', scope => {
    const x: number = scope.x
    const y: number = scope.y
    return MayFail.Success(true)
  })
  .retV(MayFail.Error('true'))

MayFail.do<{ code: number, message: string }>()
  .assignF('x', scope => {
    return MayFail.Error({
      code: 5,
      message: 'fail',
    })
  })

MayFail.do()
  .assignV('x', 7 > 10 ? MayFail.Success(10) : MayFail.Error('10'))

MayFail.do()
  .assignV('x', 7 > 10 ? MayFail.Success<number, string>(10) : MayFail.Error('10'))

MayFail.do()
  .assignV('x', 7 > 10 ? MayFail.Success(10) : MayFail.Error<number, string>('10'))

MayFail.do()
  .assignV('x', 7 > 10 ? MayFail.Success<number, string>(10) : MayFail.Error<number, string>('10'))

MayFail.do()
  .assignF('x', s => 7 > 10 ? MayFail.Success<number, string>(10) : MayFail.Error<number, string>('10'))

// @ts-expect-error
MayFail.do<string>().assignV('x', MayFail.Error(5))

MayFail.do()
  .assignV('x', Math.random() > 0.5 ? MayFail.Success(1) : MayFail.Error('out of luck'))
  // @ts-expect-error
  .assignV('y', MayFail.Error(10))

MayFail.do()
  .assignF('x', () => Math.random() > 0.5 ? MayFail.Success(1) : MayFail.Error('out of luck'))
  // @ts-expect-error
  .assignV('y', MayFail.Error(10))

// @ts-expect-error
MayFail.do<string>().assignV('x', MayFail.Error('true')).assignV('y', MayFail.Error(4))
// @ts-expect-error
MayFail.do().assignV('x', MayFail.Error(true)).assignV('y', MayFail.Error(4))
// @ts-expect-error
MayFail.do().assignV('x', MayFail.Error(true)).assignV('y', MayFail.Error(4)).assignV('z', MayFail.Error(false))
// @ts-expect-error
MayFail.do<string>().assignV('x', MayFail.Error(true)).assignV('y', MayFail.Error('4')).assignV('z', MayFail.Error('false'))
// @ts-expect-error
MayFail.do<string>().assignV('x', MayFail.Error(true)).assignV('y', MayFail.Success('4')).assignV('z', MayFail.Error(false))
// @ts-expect-error
MayFail.do<string>().assignF('x', () => MayFail.Success(4)).assignV('y', MayFail.Error(4))
// @ts-expect-error
MayFail.do().retV(MayFail.Error('no')).assignV('x', MayFail.Error(5))
// @ts-expect-error
MayFail.do().retV(MayFail.Error('no')).assignV('x', 5 > 7 ? MayFail.Success(5) : MayFail.Error(7))
// @ts-expect-error
MayFail.do().retF(() => MayFail.Error('no')).assignV('x', MayFail.Error(5))
// @ts-expect-error
MayFail.do().retF(() => MayFail.Error('no')).assignV('x', 5 > 7 ? MayFail.Success(5) : MayFail.Error(7))