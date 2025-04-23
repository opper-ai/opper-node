import { EvaluatorFn, Metric } from './types';

/**
 * Decorator function that converts a function into an evaluator.
 * The decorated function will be recognized as an evaluator by the Opper SDK.
 * 
 * @param fn The function to decorate
 * @returns The decorated function
 */
export function evaluator(fn: Function): EvaluatorFn {
    (fn as any).__isOpperEvaluator = true;
    return fn as EvaluatorFn;
}

/**
 * Checks if a function is an evaluator
 * 
 * @param fn The function to check
 * @returns True if the function is an evaluator
 */
export function isEvaluator(fn: Function): boolean {
    return (fn as any).__isOpperEvaluator === true;
}

/**
 * Get the name of an evaluator function
 * 
 * @param fn The evaluator function
 * @returns The name of the evaluator
 */
export function getEvaluatorName(fn: Function): string {
    return fn.name || 'unnamed_evaluator';
} 