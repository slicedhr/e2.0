/* global describe, beforeEach, it, browser, expect */
'use strict';

var CotizacionPagePo = require('./cotizacion.po');

describe('Cotizacion page', function () {
  var cotizacionPage;

  beforeEach(function () {
    cotizacionPage = new CotizacionPagePo();
    browser.get('/#/cotizacion');
  });

  it('should say CotizacionCtrl', function () {
    expect(cotizacionPage.heading.getText()).toEqual('cotizacion');
    expect(cotizacionPage.text.getText()).toEqual('CotizacionCtrl');
  });
});
