function sum_to_n_a(n: number): number {
  // Iterative loop
  // Time: O(n), Space: O(1)
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

function sum_to_n_b(n: number): number {
  // Math formula: n * (n + 1) / 2
  // Time: O(1), Space: O(1) -- most efficient here
  return (n * (n + 1)) / 2;
}

function sum_to_n_c(n: number): number {
  // Recursion
  // Time: O(n), Space: O(n) due to call stack
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
}
