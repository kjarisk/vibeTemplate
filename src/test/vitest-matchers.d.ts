import 'vitest'
import type * as matchers from '@testing-library/jest-dom/matchers'

declare module 'vitest' {
  interface Matchers<R, T> extends matchers.TestingLibraryMatchers<unknown, R> {}
}
