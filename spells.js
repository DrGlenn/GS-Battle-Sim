var playerSpell = function(name, effect, manaCost, hostility){
	this.name = name;
	this.effect = effect;
	this.manaCost = manaCost;
	this.hostile = hostility
}

earthquake = new playerSpell("Earthquake", 21, 15, true);
push = new playerSpell("Push", 10, 10, true);

var spellList = [earthquake, push];
