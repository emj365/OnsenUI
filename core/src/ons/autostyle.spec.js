'use strict';

describe('ons._autoStyle', () => {
  it('exists', () => {
    expect(ons._autoStyle).to.be.an.instanceOf(Object);
  });

  describe('getPlatform', () => {
    it('returns the auto styling platform', () => {
      const e = document.createElement('ons-button');
      expect(ons._autoStyle.getPlatform(e)).to.be.null;
      ons.platform.select('android');
      expect(ons._autoStyle.getPlatform(e)).to.equal('android');
      e.setAttribute('disable-auto-styling', '');
      expect(ons._autoStyle.getPlatform(e)).to.be.null;
      ons.platform.select('');
    });
  });

  it('adds \'material\' modifiers and effects on Android', () => {
    ons.platform.select('android');
    let e = document.createElement('ons-button');
    expect(e.getAttribute('modifier')).to.equal('material');
    expect(e.hasAttribute('ripple')).to.be.true;
    expect(e.firstChild.tagName.toLowerCase()).to.equal('ons-ripple');
    e = ons._util.createElement('<ons-button modifier="quiet"></ons-button>');
    expect(e.getAttribute('modifier')).to.contain('material--flat');
    e = ons._util.createElement('<ons-button modifier="large--quiet"></ons-button>');
    expect(e.getAttribute('modifier')).to.contain('large').and.to.contain('material--flat');
    ons.platform.select('');
  });

  describe('mapModifier', () => {
    it('returns the correct modifier only if autoStyle is active', () => {
      const e = document.createElement('ons-button');
      expect(ons._autoStyle.mapModifier('quiet', e)).to.equal('quiet');
      ons.platform.select('android');
      expect(ons._autoStyle.mapModifier('quiet', e)).to.equal('material--flat');
      e.setAttribute('disable-auto-styling', '');
      expect(ons._autoStyle.mapModifier('quiet', e)).to.equal('quiet');
      ons.platform.select('');
    });
  });

  describe('restore', () => {
    it('adds material modifier back if necessary', () => {
      const e = document.createElement('ons-button');
      expect(ons._autoStyle.restore(e)).to.be.false;
      ons.platform.select('android');
      expect(ons._autoStyle.restore(e)).to.be.true;
      expect(e.getAttribute('modifier')).to.equal('material');
      e.setAttribute('disable-auto-styling', '');
      e.removeAttribute('modifier');
      expect(ons._autoStyle.restore(e)).to.be.false;
      expect(e.hasAttribute('modifier')).to.be.false;
      ons.platform.select('');
    });
  });
});
