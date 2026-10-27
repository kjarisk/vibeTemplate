import 'vitest'
import type * as matchers from '@testing-library/jest-dom/matchers'

declare module 'vitest' {
  // Vitest 5 uses two matcher type parameters; jest-dom still augments the older form.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Matchers<R, T> extends matchers.TestingLibraryMatchers<T, R> {}
}
