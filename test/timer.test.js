describe('Timer', function() {

  beforeEach(function(){
    fixture.base = 'test/fixtures';
    fixture.load('/index.html');
  });

  afterEach(function(){
    fixture.cleanup();
  });

  describe('display', function() {

    beforeEach(function() {
      jasmine.clock().install();
      var baseTime = Date.now;
      jasmine.clock().mockDate(baseTime);
      startTimer();
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('starts upon keypress', function(){
      startTimer();
      expect(getKeyDownFired()).toEqual(true);
    });

    it('stops when the sentence is completed', function() {
      startTimer();
      stopTimer();
      expect(getKeyDownFired()).toEqual(false);
    });

    it('shows elapsed time', function(){
      jasmine.clock().tick(1100);
      expect(document.getElementById('timer').innerHTML).toEqual('Time: 1 seconds');
      jasmine.clock().tick(1100);
      expect(document.getElementById('timer').innerHTML).toEqual('Time: 2 seconds');
    });

    it('shows total time when stopped', function() {
      jasmine.clock().tick(2100);
      stopTimer();
      expect(document.getElementById('timer').innerHTML).toEqual('Time: 2.10 seconds');
    });

    it('does not advance time after being stopped', function() {
      jasmine.clock().tick(2100);
      stopTimer();
      jasmine.clock().tick(2100);
      expect(document.getElementById('timer').innerHTML).toEqual('Time: 2.10 seconds');
    });

    it('shows user\'s wpm after completing sentence', function() {
      jasmine.clock().tick(4000);
      startTimer();
      stopTimer(4);
      expect(document.getElementById('wpm').innerHTML).toEqual('WPM: 12.00');
    });
  });
});
