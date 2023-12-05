import '@testing-library/jest-dom';

let originalerror = console.error;
beforeAll(() => {
  console.error = () => {
  return
  }});

afterAll(() => {
  console.error = originalerror;
});