'use strict';

const MEACT = require('./index');
const should = require('should');

(() => {
  let defaultTokenizer = new MEACT();

  (defaultTokenizer.tokenize('')).should.be.an.Array().and.have.length(0);
  (defaultTokenizer.tokenize('100')).should.be.an.Array().and.have.length(0);
  (defaultTokenizer.tokenize('hello world')).should.eql(['hello', 'world']);
  (defaultTokenizer.tokenize('-13243-,...12 .. 1 1}}}hello world!..')).should.eql(['hello', 'world']);

  (defaultTokenizer.tokenize('hello, 邊度有櫃員機呀? thanks'))
    .should.eql(['hello', '邊度', '有', '櫃員機', '呀', 'thanks']);

  (defaultTokenizer.tokenize(`你好, what's up, how are you all doing?`))
    .should.eql(['你好', 'what', 'is', 'up', 'how', 'are', 'you', 'all', 'doing']);

  (defaultTokenizer.lemmatize(`你好, what's up, how are you all doing?`))
    .should.eql(['你好', 'what', 'be', 'up', 'how', 'be', 'you', 'all', 'do']);

  defaultTokenizer = null;

  let simplifiedTokenizer = new MEACT({ simplified: true });
  (simplifiedTokenizer.tokenize('我家没有电脑。 A group is an implementation-specific, potentially-interactive view. 我家没有电脑。'))
    .should.eql(['我', '家', '没有', '电脑', 'A', 'group', 'is', 'an', 'implementation', 'specific', 'potentially', 'interactive', 'view', '我', '家', '没有', '电脑']);

  // Check conversion to Simplified: 边度
  (simplifiedTokenizer.tokenize(`hello, 邊度有櫃員機呀? thanks`))
    .should.eql(['hello', '边度', '有', '柜员机', '呀', 'thanks']);

  simplifiedTokenizer = null;
})();
