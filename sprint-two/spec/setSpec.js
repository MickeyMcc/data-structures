describe('set', function() {
  var set;

  beforeEach(function() {
    set = Set();
  });

  it('should have methods named "add", "contains", and "remove"', function() {
    expect(set.add).to.be.a('function');
    expect(set.contains).to.be.a('function');
    expect(set.remove).to.be.a('function');
  });

  it('should add values to a set', function() {
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    expect(set.contains('Danny Glover')).to.equal(true);
    expect(set.contains('Susan Sarandon')).to.equal(true);
  });

  it('should remove values from a set', function() {
    set.add('Mel Gibson');
    set.remove('Mel Gibson');
    expect(set.contains('Mel Gibson')).to.equal(false);
  });

  it('should return a random value from a set', function() {
    set.add('Mel Gibson');
    set.add('Danny Glover');
    set.add('Mickey McC');
    set.add('Stephanie Chou');
    set.add('John Jones');
    set.add('Spongebob Squarepants');
    set.add('Susan Sarandon');
    var randomPerson = set.getRandom();
    expect(set.contains(randomPerson)).to.equal(true);
    expect(set.getRandom()).to.not.equal(randomPerson);
  });

});
