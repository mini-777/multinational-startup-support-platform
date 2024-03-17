"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/trough";
exports.ids = ["vendor-chunks/trough"];
exports.modules = {

/***/ "(rsc)/./node_modules/trough/lib/index.js":
/*!******************************************!*\
  !*** ./node_modules/trough/lib/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   trough: () => (/* binding */ trough),\n/* harmony export */   wrap: () => (/* binding */ wrap)\n/* harmony export */ });\n// To do: remove `void`s\n// To do: remove `null` from output of our APIs, allow it as user APIs.\n/**\n * @typedef {(error?: Error | null | undefined, ...output: Array<any>) => void} Callback\n *   Callback.\n *\n * @typedef {(...input: Array<any>) => any} Middleware\n *   Ware.\n *\n * @typedef Pipeline\n *   Pipeline.\n * @property {Run} run\n *   Run the pipeline.\n * @property {Use} use\n *   Add middleware.\n *\n * @typedef {(...input: Array<any>) => void} Run\n *   Call all middleware.\n *\n *   Calls `done` on completion with either an error or the output of the\n *   last middleware.\n *\n *   > 👉 **Note**: as the length of input defines whether async functions get a\n *   > `next` function,\n *   > it’s recommended to keep `input` at one value normally.\n\n *\n * @typedef {(fn: Middleware) => Pipeline} Use\n *   Add middleware.\n */ /**\n * Create new middleware.\n *\n * @returns {Pipeline}\n *   Pipeline.\n */ function trough() {\n    /** @type {Array<Middleware>} */ const fns = [];\n    /** @type {Pipeline} */ const pipeline = {\n        run,\n        use\n    };\n    return pipeline;\n    /** @type {Run} */ function run(...values) {\n        let middlewareIndex = -1;\n        /** @type {Callback} */ const callback = values.pop();\n        if (typeof callback !== \"function\") {\n            throw new TypeError(\"Expected function as last argument, not \" + callback);\n        }\n        next(null, ...values);\n        /**\n     * Run the next `fn`, or we’re done.\n     *\n     * @param {Error | null | undefined} error\n     * @param {Array<any>} output\n     */ function next(error, ...output) {\n            const fn = fns[++middlewareIndex];\n            let index = -1;\n            if (error) {\n                callback(error);\n                return;\n            }\n            // Copy non-nullish input into values.\n            while(++index < values.length){\n                if (output[index] === null || output[index] === undefined) {\n                    output[index] = values[index];\n                }\n            }\n            // Save the newly created `output` for the next call.\n            values = output;\n            // Next or done.\n            if (fn) {\n                wrap(fn, next)(...output);\n            } else {\n                callback(null, ...output);\n            }\n        }\n    }\n    /** @type {Use} */ function use(middelware) {\n        if (typeof middelware !== \"function\") {\n            throw new TypeError(\"Expected `middelware` to be a function, not \" + middelware);\n        }\n        fns.push(middelware);\n        return pipeline;\n    }\n}\n/**\n * Wrap `middleware` into a uniform interface.\n *\n * You can pass all input to the resulting function.\n * `callback` is then called with the output of `middleware`.\n *\n * If `middleware` accepts more arguments than the later given in input,\n * an extra `done` function is passed to it after that input,\n * which must be called by `middleware`.\n *\n * The first value in `input` is the main input value.\n * All other input values are the rest input values.\n * The values given to `callback` are the input values,\n * merged with every non-nullish output value.\n *\n * * if `middleware` throws an error,\n *   returns a promise that is rejected,\n *   or calls the given `done` function with an error,\n *   `callback` is called with that error\n * * if `middleware` returns a value or returns a promise that is resolved,\n *   that value is the main output value\n * * if `middleware` calls `done`,\n *   all non-nullish values except for the first one (the error) overwrite the\n *   output values\n *\n * @param {Middleware} middleware\n *   Function to wrap.\n * @param {Callback} callback\n *   Callback called with the output of `middleware`.\n * @returns {Run}\n *   Wrapped middleware.\n */ function wrap(middleware, callback) {\n    /** @type {boolean} */ let called;\n    return wrapped;\n    /**\n   * Call `middleware`.\n   * @this {any}\n   * @param {Array<any>} parameters\n   * @returns {void}\n   */ function wrapped(...parameters) {\n        const fnExpectsCallback = middleware.length > parameters.length;\n        /** @type {any} */ let result;\n        if (fnExpectsCallback) {\n            parameters.push(done);\n        }\n        try {\n            result = middleware.apply(this, parameters);\n        } catch (error) {\n            const exception = /** @type {Error} */ error;\n            // Well, this is quite the pickle.\n            // `middleware` received a callback and called it synchronously, but that\n            // threw an error.\n            // The only thing left to do is to throw the thing instead.\n            if (fnExpectsCallback && called) {\n                throw exception;\n            }\n            return done(exception);\n        }\n        if (!fnExpectsCallback) {\n            if (result && result.then && typeof result.then === \"function\") {\n                result.then(then, done);\n            } else if (result instanceof Error) {\n                done(result);\n            } else {\n                then(result);\n            }\n        }\n    }\n    /**\n   * Call `callback`, only once.\n   *\n   * @type {Callback}\n   */ function done(error, ...output) {\n        if (!called) {\n            called = true;\n            callback(error, ...output);\n        }\n    }\n    /**\n   * Call `done` with one value.\n   *\n   * @param {any} [value]\n   */ function then(value) {\n        done(null, value);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvdHJvdWdoL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdCQUF3QjtBQUN4Qix1RUFBdUU7QUFFdkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTJCQyxHQUVEOzs7OztDQUtDLEdBQ00sU0FBU0E7SUFDZCw4QkFBOEIsR0FDOUIsTUFBTUMsTUFBTSxFQUFFO0lBQ2QscUJBQXFCLEdBQ3JCLE1BQU1DLFdBQVc7UUFBQ0M7UUFBS0M7SUFBRztJQUUxQixPQUFPRjtJQUVQLGdCQUFnQixHQUNoQixTQUFTQyxJQUFJLEdBQUdFLE1BQU07UUFDcEIsSUFBSUMsa0JBQWtCLENBQUM7UUFDdkIscUJBQXFCLEdBQ3JCLE1BQU1DLFdBQVdGLE9BQU9HLEdBQUc7UUFFM0IsSUFBSSxPQUFPRCxhQUFhLFlBQVk7WUFDbEMsTUFBTSxJQUFJRSxVQUFVLDZDQUE2Q0Y7UUFDbkU7UUFFQUcsS0FBSyxTQUFTTDtRQUVkOzs7OztLQUtDLEdBQ0QsU0FBU0ssS0FBS0MsS0FBSyxFQUFFLEdBQUdDLE1BQU07WUFDNUIsTUFBTUMsS0FBS1osR0FBRyxDQUFDLEVBQUVLLGdCQUFnQjtZQUNqQyxJQUFJUSxRQUFRLENBQUM7WUFFYixJQUFJSCxPQUFPO2dCQUNUSixTQUFTSTtnQkFDVDtZQUNGO1lBRUEsc0NBQXNDO1lBQ3RDLE1BQU8sRUFBRUcsUUFBUVQsT0FBT1UsTUFBTSxDQUFFO2dCQUM5QixJQUFJSCxNQUFNLENBQUNFLE1BQU0sS0FBSyxRQUFRRixNQUFNLENBQUNFLE1BQU0sS0FBS0UsV0FBVztvQkFDekRKLE1BQU0sQ0FBQ0UsTUFBTSxHQUFHVCxNQUFNLENBQUNTLE1BQU07Z0JBQy9CO1lBQ0Y7WUFFQSxxREFBcUQ7WUFDckRULFNBQVNPO1lBRVQsZ0JBQWdCO1lBQ2hCLElBQUlDLElBQUk7Z0JBQ05JLEtBQUtKLElBQUlILFNBQVNFO1lBQ3BCLE9BQU87Z0JBQ0xMLFNBQVMsU0FBU0s7WUFDcEI7UUFDRjtJQUNGO0lBRUEsZ0JBQWdCLEdBQ2hCLFNBQVNSLElBQUljLFVBQVU7UUFDckIsSUFBSSxPQUFPQSxlQUFlLFlBQVk7WUFDcEMsTUFBTSxJQUFJVCxVQUNSLGlEQUFpRFM7UUFFckQ7UUFFQWpCLElBQUlrQixJQUFJLENBQUNEO1FBQ1QsT0FBT2hCO0lBQ1Q7QUFDRjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBK0JDLEdBQ00sU0FBU2UsS0FBS0csVUFBVSxFQUFFYixRQUFRO0lBQ3ZDLG9CQUFvQixHQUNwQixJQUFJYztJQUVKLE9BQU9DO0lBRVA7Ozs7O0dBS0MsR0FDRCxTQUFTQSxRQUFRLEdBQUdDLFVBQVU7UUFDNUIsTUFBTUMsb0JBQW9CSixXQUFXTCxNQUFNLEdBQUdRLFdBQVdSLE1BQU07UUFDL0QsZ0JBQWdCLEdBQ2hCLElBQUlVO1FBRUosSUFBSUQsbUJBQW1CO1lBQ3JCRCxXQUFXSixJQUFJLENBQUNPO1FBQ2xCO1FBRUEsSUFBSTtZQUNGRCxTQUFTTCxXQUFXTyxLQUFLLENBQUMsSUFBSSxFQUFFSjtRQUNsQyxFQUFFLE9BQU9aLE9BQU87WUFDZCxNQUFNaUIsWUFBWSxrQkFBa0IsR0FBSWpCO1lBRXhDLGtDQUFrQztZQUNsQyx5RUFBeUU7WUFDekUsa0JBQWtCO1lBQ2xCLDJEQUEyRDtZQUMzRCxJQUFJYSxxQkFBcUJILFFBQVE7Z0JBQy9CLE1BQU1PO1lBQ1I7WUFFQSxPQUFPRixLQUFLRTtRQUNkO1FBRUEsSUFBSSxDQUFDSixtQkFBbUI7WUFDdEIsSUFBSUMsVUFBVUEsT0FBT0ksSUFBSSxJQUFJLE9BQU9KLE9BQU9JLElBQUksS0FBSyxZQUFZO2dCQUM5REosT0FBT0ksSUFBSSxDQUFDQSxNQUFNSDtZQUNwQixPQUFPLElBQUlELGtCQUFrQkssT0FBTztnQkFDbENKLEtBQUtEO1lBQ1AsT0FBTztnQkFDTEksS0FBS0o7WUFDUDtRQUNGO0lBQ0Y7SUFFQTs7OztHQUlDLEdBQ0QsU0FBU0MsS0FBS2YsS0FBSyxFQUFFLEdBQUdDLE1BQU07UUFDNUIsSUFBSSxDQUFDUyxRQUFRO1lBQ1hBLFNBQVM7WUFDVGQsU0FBU0ksVUFBVUM7UUFDckI7SUFDRjtJQUVBOzs7O0dBSUMsR0FDRCxTQUFTaUIsS0FBS0UsS0FBSztRQUNqQkwsS0FBSyxNQUFNSztJQUNiO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHJvdWdoL2xpYi9pbmRleC5qcz81YjkwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRvIGRvOiByZW1vdmUgYHZvaWRgc1xuLy8gVG8gZG86IHJlbW92ZSBgbnVsbGAgZnJvbSBvdXRwdXQgb2Ygb3VyIEFQSXMsIGFsbG93IGl0IGFzIHVzZXIgQVBJcy5cblxuLyoqXG4gKiBAdHlwZWRlZiB7KGVycm9yPzogRXJyb3IgfCBudWxsIHwgdW5kZWZpbmVkLCAuLi5vdXRwdXQ6IEFycmF5PGFueT4pID0+IHZvaWR9IENhbGxiYWNrXG4gKiAgIENhbGxiYWNrLlxuICpcbiAqIEB0eXBlZGVmIHsoLi4uaW5wdXQ6IEFycmF5PGFueT4pID0+IGFueX0gTWlkZGxld2FyZVxuICogICBXYXJlLlxuICpcbiAqIEB0eXBlZGVmIFBpcGVsaW5lXG4gKiAgIFBpcGVsaW5lLlxuICogQHByb3BlcnR5IHtSdW59IHJ1blxuICogICBSdW4gdGhlIHBpcGVsaW5lLlxuICogQHByb3BlcnR5IHtVc2V9IHVzZVxuICogICBBZGQgbWlkZGxld2FyZS5cbiAqXG4gKiBAdHlwZWRlZiB7KC4uLmlucHV0OiBBcnJheTxhbnk+KSA9PiB2b2lkfSBSdW5cbiAqICAgQ2FsbCBhbGwgbWlkZGxld2FyZS5cbiAqXG4gKiAgIENhbGxzIGBkb25lYCBvbiBjb21wbGV0aW9uIHdpdGggZWl0aGVyIGFuIGVycm9yIG9yIHRoZSBvdXRwdXQgb2YgdGhlXG4gKiAgIGxhc3QgbWlkZGxld2FyZS5cbiAqXG4gKiAgID4g8J+RiSAqKk5vdGUqKjogYXMgdGhlIGxlbmd0aCBvZiBpbnB1dCBkZWZpbmVzIHdoZXRoZXIgYXN5bmMgZnVuY3Rpb25zIGdldCBhXG4gKiAgID4gYG5leHRgIGZ1bmN0aW9uLFxuICogICA+IGl04oCZcyByZWNvbW1lbmRlZCB0byBrZWVwIGBpbnB1dGAgYXQgb25lIHZhbHVlIG5vcm1hbGx5LlxuXG4gKlxuICogQHR5cGVkZWYgeyhmbjogTWlkZGxld2FyZSkgPT4gUGlwZWxpbmV9IFVzZVxuICogICBBZGQgbWlkZGxld2FyZS5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBuZXcgbWlkZGxld2FyZS5cbiAqXG4gKiBAcmV0dXJucyB7UGlwZWxpbmV9XG4gKiAgIFBpcGVsaW5lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJvdWdoKCkge1xuICAvKiogQHR5cGUge0FycmF5PE1pZGRsZXdhcmU+fSAqL1xuICBjb25zdCBmbnMgPSBbXVxuICAvKiogQHR5cGUge1BpcGVsaW5lfSAqL1xuICBjb25zdCBwaXBlbGluZSA9IHtydW4sIHVzZX1cblxuICByZXR1cm4gcGlwZWxpbmVcblxuICAvKiogQHR5cGUge1J1bn0gKi9cbiAgZnVuY3Rpb24gcnVuKC4uLnZhbHVlcykge1xuICAgIGxldCBtaWRkbGV3YXJlSW5kZXggPSAtMVxuICAgIC8qKiBAdHlwZSB7Q2FsbGJhY2t9ICovXG4gICAgY29uc3QgY2FsbGJhY2sgPSB2YWx1ZXMucG9wKClcblxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGZ1bmN0aW9uIGFzIGxhc3QgYXJndW1lbnQsIG5vdCAnICsgY2FsbGJhY2spXG4gICAgfVxuXG4gICAgbmV4dChudWxsLCAuLi52YWx1ZXMpXG5cbiAgICAvKipcbiAgICAgKiBSdW4gdGhlIG5leHQgYGZuYCwgb3Igd2XigJlyZSBkb25lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFcnJvciB8IG51bGwgfCB1bmRlZmluZWR9IGVycm9yXG4gICAgICogQHBhcmFtIHtBcnJheTxhbnk+fSBvdXRwdXRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBuZXh0KGVycm9yLCAuLi5vdXRwdXQpIHtcbiAgICAgIGNvbnN0IGZuID0gZm5zWysrbWlkZGxld2FyZUluZGV4XVxuICAgICAgbGV0IGluZGV4ID0gLTFcblxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gQ29weSBub24tbnVsbGlzaCBpbnB1dCBpbnRvIHZhbHVlcy5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICBpZiAob3V0cHV0W2luZGV4XSA9PT0gbnVsbCB8fCBvdXRwdXRbaW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBvdXRwdXRbaW5kZXhdID0gdmFsdWVzW2luZGV4XVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNhdmUgdGhlIG5ld2x5IGNyZWF0ZWQgYG91dHB1dGAgZm9yIHRoZSBuZXh0IGNhbGwuXG4gICAgICB2YWx1ZXMgPSBvdXRwdXRcblxuICAgICAgLy8gTmV4dCBvciBkb25lLlxuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIHdyYXAoZm4sIG5leHQpKC4uLm91dHB1dClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIC4uLm91dHB1dClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogQHR5cGUge1VzZX0gKi9cbiAgZnVuY3Rpb24gdXNlKG1pZGRlbHdhcmUpIHtcbiAgICBpZiAodHlwZW9mIG1pZGRlbHdhcmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICdFeHBlY3RlZCBgbWlkZGVsd2FyZWAgdG8gYmUgYSBmdW5jdGlvbiwgbm90ICcgKyBtaWRkZWx3YXJlXG4gICAgICApXG4gICAgfVxuXG4gICAgZm5zLnB1c2gobWlkZGVsd2FyZSlcbiAgICByZXR1cm4gcGlwZWxpbmVcbiAgfVxufVxuXG4vKipcbiAqIFdyYXAgYG1pZGRsZXdhcmVgIGludG8gYSB1bmlmb3JtIGludGVyZmFjZS5cbiAqXG4gKiBZb3UgY2FuIHBhc3MgYWxsIGlucHV0IHRvIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24uXG4gKiBgY2FsbGJhY2tgIGlzIHRoZW4gY2FsbGVkIHdpdGggdGhlIG91dHB1dCBvZiBgbWlkZGxld2FyZWAuXG4gKlxuICogSWYgYG1pZGRsZXdhcmVgIGFjY2VwdHMgbW9yZSBhcmd1bWVudHMgdGhhbiB0aGUgbGF0ZXIgZ2l2ZW4gaW4gaW5wdXQsXG4gKiBhbiBleHRyYSBgZG9uZWAgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIGl0IGFmdGVyIHRoYXQgaW5wdXQsXG4gKiB3aGljaCBtdXN0IGJlIGNhbGxlZCBieSBgbWlkZGxld2FyZWAuXG4gKlxuICogVGhlIGZpcnN0IHZhbHVlIGluIGBpbnB1dGAgaXMgdGhlIG1haW4gaW5wdXQgdmFsdWUuXG4gKiBBbGwgb3RoZXIgaW5wdXQgdmFsdWVzIGFyZSB0aGUgcmVzdCBpbnB1dCB2YWx1ZXMuXG4gKiBUaGUgdmFsdWVzIGdpdmVuIHRvIGBjYWxsYmFja2AgYXJlIHRoZSBpbnB1dCB2YWx1ZXMsXG4gKiBtZXJnZWQgd2l0aCBldmVyeSBub24tbnVsbGlzaCBvdXRwdXQgdmFsdWUuXG4gKlxuICogKiBpZiBgbWlkZGxld2FyZWAgdGhyb3dzIGFuIGVycm9yLFxuICogICByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGlzIHJlamVjdGVkLFxuICogICBvciBjYWxscyB0aGUgZ2l2ZW4gYGRvbmVgIGZ1bmN0aW9uIHdpdGggYW4gZXJyb3IsXG4gKiAgIGBjYWxsYmFja2AgaXMgY2FsbGVkIHdpdGggdGhhdCBlcnJvclxuICogKiBpZiBgbWlkZGxld2FyZWAgcmV0dXJucyBhIHZhbHVlIG9yIHJldHVybnMgYSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQsXG4gKiAgIHRoYXQgdmFsdWUgaXMgdGhlIG1haW4gb3V0cHV0IHZhbHVlXG4gKiAqIGlmIGBtaWRkbGV3YXJlYCBjYWxscyBgZG9uZWAsXG4gKiAgIGFsbCBub24tbnVsbGlzaCB2YWx1ZXMgZXhjZXB0IGZvciB0aGUgZmlyc3Qgb25lICh0aGUgZXJyb3IpIG92ZXJ3cml0ZSB0aGVcbiAqICAgb3V0cHV0IHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TWlkZGxld2FyZX0gbWlkZGxld2FyZVxuICogICBGdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtDYWxsYmFja30gY2FsbGJhY2tcbiAqICAgQ2FsbGJhY2sgY2FsbGVkIHdpdGggdGhlIG91dHB1dCBvZiBgbWlkZGxld2FyZWAuXG4gKiBAcmV0dXJucyB7UnVufVxuICogICBXcmFwcGVkIG1pZGRsZXdhcmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cmFwKG1pZGRsZXdhcmUsIGNhbGxiYWNrKSB7XG4gIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgbGV0IGNhbGxlZFxuXG4gIHJldHVybiB3cmFwcGVkXG5cbiAgLyoqXG4gICAqIENhbGwgYG1pZGRsZXdhcmVgLlxuICAgKiBAdGhpcyB7YW55fVxuICAgKiBAcGFyYW0ge0FycmF5PGFueT59IHBhcmFtZXRlcnNcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiB3cmFwcGVkKC4uLnBhcmFtZXRlcnMpIHtcbiAgICBjb25zdCBmbkV4cGVjdHNDYWxsYmFjayA9IG1pZGRsZXdhcmUubGVuZ3RoID4gcGFyYW1ldGVycy5sZW5ndGhcbiAgICAvKiogQHR5cGUge2FueX0gKi9cbiAgICBsZXQgcmVzdWx0XG5cbiAgICBpZiAoZm5FeHBlY3RzQ2FsbGJhY2spIHtcbiAgICAgIHBhcmFtZXRlcnMucHVzaChkb25lKVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBtaWRkbGV3YXJlLmFwcGx5KHRoaXMsIHBhcmFtZXRlcnMpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGV4Y2VwdGlvbiA9IC8qKiBAdHlwZSB7RXJyb3J9ICovIChlcnJvcilcblxuICAgICAgLy8gV2VsbCwgdGhpcyBpcyBxdWl0ZSB0aGUgcGlja2xlLlxuICAgICAgLy8gYG1pZGRsZXdhcmVgIHJlY2VpdmVkIGEgY2FsbGJhY2sgYW5kIGNhbGxlZCBpdCBzeW5jaHJvbm91c2x5LCBidXQgdGhhdFxuICAgICAgLy8gdGhyZXcgYW4gZXJyb3IuXG4gICAgICAvLyBUaGUgb25seSB0aGluZyBsZWZ0IHRvIGRvIGlzIHRvIHRocm93IHRoZSB0aGluZyBpbnN0ZWFkLlxuICAgICAgaWYgKGZuRXhwZWN0c0NhbGxiYWNrICYmIGNhbGxlZCkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb25cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRvbmUoZXhjZXB0aW9uKVxuICAgIH1cblxuICAgIGlmICghZm5FeHBlY3RzQ2FsbGJhY2spIHtcbiAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnRoZW4gJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlc3VsdC50aGVuKHRoZW4sIGRvbmUpXG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGRvbmUocmVzdWx0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhlbihyZXN1bHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgYGNhbGxiYWNrYCwgb25seSBvbmNlLlxuICAgKlxuICAgKiBAdHlwZSB7Q2FsbGJhY2t9XG4gICAqL1xuICBmdW5jdGlvbiBkb25lKGVycm9yLCAuLi5vdXRwdXQpIHtcbiAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgY2FsbGVkID0gdHJ1ZVxuICAgICAgY2FsbGJhY2soZXJyb3IsIC4uLm91dHB1dClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCBgZG9uZWAgd2l0aCBvbmUgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBbdmFsdWVdXG4gICAqL1xuICBmdW5jdGlvbiB0aGVuKHZhbHVlKSB7XG4gICAgZG9uZShudWxsLCB2YWx1ZSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbInRyb3VnaCIsImZucyIsInBpcGVsaW5lIiwicnVuIiwidXNlIiwidmFsdWVzIiwibWlkZGxld2FyZUluZGV4IiwiY2FsbGJhY2siLCJwb3AiLCJUeXBlRXJyb3IiLCJuZXh0IiwiZXJyb3IiLCJvdXRwdXQiLCJmbiIsImluZGV4IiwibGVuZ3RoIiwidW5kZWZpbmVkIiwid3JhcCIsIm1pZGRlbHdhcmUiLCJwdXNoIiwibWlkZGxld2FyZSIsImNhbGxlZCIsIndyYXBwZWQiLCJwYXJhbWV0ZXJzIiwiZm5FeHBlY3RzQ2FsbGJhY2siLCJyZXN1bHQiLCJkb25lIiwiYXBwbHkiLCJleGNlcHRpb24iLCJ0aGVuIiwiRXJyb3IiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/trough/lib/index.js\n");

/***/ })

};
;