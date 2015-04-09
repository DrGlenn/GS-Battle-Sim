var get = function(id) {
    return document.getElementById(id);
}

var divider = "\n------------------------------------------------------";
var that;
var gameCommandsArray = ["adventurer.adventurerData()","adventurer.addToInventory()","adventurer.viewInventory()", "adventurer.addSpell(spell)",
                "adventurer.viewSpells()", "adventurer.setWeapon(woodenMeleeWeapon || woodenRangeWeapon)",
                "adventurer.lotOfPots() -- Adds 50 HP Potions", "adventurer.playerOneHealthItem.use()",
                "adventurer.playerTwoHealthItem.use()", "adventurer.battle()", "adventurer.attack()"];

var Game = {
    gameItems : ["HP Pot", "MP Pot", "Brass Guard"], 
    commands : function(){
        var i = 0;
        while(i < gameCommandsArray.length){ console.log(gameCommandsArray[i] + divider); i++ }
    },
    enemy : undefined,
    enemyList : ["Skeleton Warrior", "Vale Rat"], 
    gameEnemies : {
        skeleton : { name : "Skeleton Warrior", health : 40, attack : "Skeletal Slash", damage : 6 }, 
        rat : { name : "Vale Rat", health : 20, attack : "Scratch", damage : 2 }, 
    },
    enemyHealth : undefined,
    inBattle : false,

    playerTurn : true
};


var Adventurer = function(name, health, mana) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.maxOverheal = this.maxHealth * 2;
    this.mana = mana;
    this.inventory = [];
    this.spells = [];
    this.weapon;
    this.level = 1;
    this.attackPower;
    /*var experience = 5;
    var neededExperience = experience * 2;

    this.addExperience = function(experienceGiven){
        experience += experienceGiven;
        console.log(experience);
        console.log(neededExperience);

        if(experience >= neededExperience){
            this.level += 1;
            var previousLevel = this.level - 1;
            console.log(this.name + " has " + "LEVELED UP!" + "(" + previousLevel + "->" + this.level + ")");
            neededExperience = experience * 2;
        }
    }*/
    
}

var woodenMeleeWeapon = {
    damage : 8,
    name : "Wooden Sword",
    uses : 40,
    info : "Your weathered but trusty wooden sword"
};

var woodenRangeWeapon = {
    damage : 4,
    rangedDamage : 13,
    mana : 5,
    name : "Wooden Staff",
    uses: 40,
    info : "A wooden staff with a rock-hard tip"
};

Adventurer.prototype.addToInventory = function(item) {
    for(i = 0; i < Game.gameItems.length; i++){
        if(item == Game.gameItems[i]){ this.inventory.push(item); }
    }
}

Adventurer.prototype.addSpell = function(spell) {
    this.spells.push(spell);
}

Adventurer.prototype.setWeapon = function(weapon) {
    if(weapon == woodenMeleeWeapon){
        this.weapon = woodenMeleeWeapon; 
        Game.gameItems.push(weapon); 
    }
    else if(weapon == woodenRangeWeapon){
        this.weapon = woodenRangeWeapon; Game.gameItems.push(weapon);
        Game.gameItems.push(weapon);
    }
}

var HealthItem = function(adventurer) {
    this.healthItemName = "";
    this.healAmount = 0;

    this.use = function() {
        that = adventurer;
        console.log(that.name);
        for (var x = 0; x < that.inventory.length; x++) {
            if (that.inventory[x] == "HP Pot") {
                this.healthItemName = "HP Pot";
                this.healAmount = 30;
                that.health += this.healAmount;
                console.log(that.name + " Has Used " + this.healthItemName + " For " + this.healAmount + divider);
                if (that.health > that.maxHealth && that.health < that.maxOverheal) {
                    var overheal = that.health - that.maxHealth;
                    console.log("Overhealed by " + overheal + "!");
                } else if (that.health > that.maxOverheal) {
                    console.log(that.name + " cannot " + "be " + "overhealed " + "anymore!");
                    that.health = that.maxOverheal;
                }
                that.inventory[x] = "";
                return;
            }
        }
        console.log("No Health Items in Inventory" + divider);
    }
}

Adventurer.prototype.adventurerData = function() {
    console.log(this.name);
    console.log("Health: " + this.health);
    console.log("Mana: " + this.mana + divider);
}

Adventurer.prototype.viewSpells = function() {
    for (var i = 0; i < this.spells.length; i++) {
        console.log(this.spells[i] + divider);
    }
}

Adventurer.prototype.useSpell = function(spell) {
    for (var i = 0; i < this.spells.length; i++) {
        if (this.spells[i] == spell) {
            console.log("Yep");
            return;
        }
    }
    console.log("You don't know how to do that..." + divider);

}

Adventurer.prototype.viewInventory = function() {
    for (var x = 0; x < this.inventory.length; x++) {
        console.log(this.inventory[x] + divider);
    }
    if (this.inventory.length == 0) {
        console.log(this.name + "'s" + " bag is empty");
    }
}

Adventurer.prototype.lotOfPots = function() {
    for (var i = 0; i < 50; i++) {
        this.addToInventory("HP Pot");
    }
}

Adventurer.prototype.battle = function(){
    if(Game.enemy != undefined){
        console.log("You're already in a battle!");
    }
    else{
    Game.inBattle = true;
    Game.enemy = Game.enemyList[Math.floor(Math.random()*Game.enemyList.length)];
    Game.enemyHealth = Game.enemy.health;
    if(Game.enemy == "Skeleton Warrior"){
        Game.enemy = Game.gameEnemies.skeleton;
    }
    else{
        Game.enemy = Game.gameEnemies.rat;
    }
    console.log(this.name + "'s" + " party has encountered " + Game.enemy.name + "(HP:" + Game.enemy.health + ")");
}
}

Adventurer.prototype.attack = function(){
    while(Game.playerTurn){
        Game.enemyHealth -= this.weapon.damage;
        console.log(this.name +  " hit " + Game.enemy.name + " for " + this.weapon.damage + "!");
        console.log(Game.enemy.name + " HP: " + Game.enemyHealth + divider);
        if(Game.enemyHealth <= 0){
            Game.enemyHealth = 0;
            console.log(this.name + "'s" + " party has defeated " + Game.enemy.name + "!" + divider);
            Game.enemy = undefined;
        }
        Game.playerTurn = false;
    }
    Game.playerTurn = true;
}

var isaac = new Adventurer("Isaac", 100, 50);
var mia = new Adventurer("Mia", 80, 90);

isaac.setWeapon(woodenMeleeWeapon);
mia.setWeapon(woodenRangeWeapon);

Adventurer.prototype.playerOneHealthItem = new HealthItem(isaac);
Adventurer.prototype.playerTwoHealthItem = new HealthItem(mia);

isaac.addSpell("Earthquake");
isaac.addSpell("Push");

mia.addSpell("Soothing Waters");
mia.addSpell("Sleet");

console.log("Golden Sun Battle Sim" + divider);
console.log("Enter - Game.commands() - to view all usable functions" + divider);
