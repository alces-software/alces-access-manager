/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
//
// Return a function which runs the wrapped function `fn` without propagating
// any events.
//
export default function(fn) {
  return (event, ...args) => {
    if (event && event.preventDefault) {
      event.preventDefault()
      event.stopPropagation()
      return fn(...args);
    }
    return fn(...[event].concat(args));
  }
}
