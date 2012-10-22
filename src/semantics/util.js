// Copyright 2012 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  EXPRESSION_STATEMENT,
  LITERAL_EXPRESSION
} from '../syntax/trees/ParseTreeType.js';
import TokenType from '../syntax/TokenType.js';

/**
 * Returns the string value for a literal token.
 * @param {LiteralToken} token
 * @return {string}
 */
export function evaluateStringLiteral(token) {
  // TODO(arv): I feel dirty using eval here. We should just do the right
  // thing!
  return eval(token.value);
}

/**
 * @param {Array.<ParseTree>} list
 * @return {boolean}
 */
export function hasUseStrict(list) {
  var li;
  if (!list || !list.length || !(li = list[0]))
    return false;
  if (li.type !== EXPRESSION_STATEMENT || !(li = li.expression))
    return false;
  if (li.type !== LITERAL_EXPRESSION   || !(li = li.literalToken))
    return false;
  if (li.type !== TokenType.STRING)
    return false;
  return evaluateStringLiteral(li) === 'use strict';
}
