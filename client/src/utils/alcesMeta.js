/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
export default {
  alcesMeta: {},

  getAlcesMeta(name) {
    const json = document.body.getAttribute("data-alces-metadata")
    const md = JSON.parse(json);
    if (md) {
      this.alcesMeta = md;
    }
    return this.alcesMeta[name];
  }
}
