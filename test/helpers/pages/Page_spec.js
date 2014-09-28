"use strict";
var Browser = require("zombie");
var Lab     = require("lab");
var Page    = require("./Page");
var script  = exports.lab = Lab.script();

var before   = script.before;
var describe = script.describe;
var expect   = Lab.expect;
var it       = script.it;

describe("A page helper", function () {
  var page;

  before(function (done) {
    var browser = new Browser();

    page = new Page(browser);
    browser.loadFixture("test_fixture.html").nodeify(done);
  });

  it("can retrieve the page title", function (done) {
    expect(page.title(), "title").to.equal("Test Fixture");
    done();
  });

  it("can retrieve the main content header", function (done) {
    expect(page.contentHeader(), "header").to.equal("Content Header");
    done();
  });

  describe("on a page with jQuery", function () {
    var page;

    before(function (done) {
      var browser = new Browser();

      page = new Page(browser);
      browser.loadFixture("jquery.html").nodeify(done);
    });

    it("can return the jQuery object", function (done) {
      expect(page.jQuery(), "jQuery").to.exist;
      done();
    });
  });

  describe("on a page without jQuery", function () {
    var page;

    before(function (done) {
      var browser = new Browser();

      page = new Page(browser);
      browser.loadFixture("test_fixture.html").nodeify(done);
    });

    it("throws an exception when trying to retrieve jQuery", function (done) {
      expect(function () {
        page.jQuery();
      }).to.throw(/jquery is not present/i);
      done();
    });
  });
});
