import {Component, Property} from '@wonderlandengine/api';
import {HowlerAudioSource} from "@wonderlandengine/components";

const RAISE_STEP = 0.015;
const RAISE_AMOUNT = 0.20
const RAISE_TIME = 1500;
/**
 * test-parent
 */
export class GameLogic extends Component {
    static TypeName = 'game-logic';
    static Properties = {
        gamePoints: Property.object(),
        gameLevel: Property.object(),
        gameMoles: Property.object()
    };

    init() {
        console.log('init() with param', this.param);
        this.currentMoleIndex = 1;
        this.moles = this.object.children.map(child => child.children[0]);
        this.moleRaisedCount = 0;
        this.currentPoints = 0;
        this.currentLevel = 1;
        this.molesHit = 0;
        this.molexMax = 0;
        this.molesMin = 0;
        this.raise_step = RAISE_STEP;
        this.raise_time = RAISE_TIME;
        this.gamePointsText = this.gamePoints.getComponent('text');
        this.gameLevelText = this.gameLevel.getComponent('text');
        this.gameMolesText = this.gameMoles.getComponent('text');
        this.moleLoverTimeout = null;
    }

    start() {
        console.log('start() with param', this.param);
        this.startGame();
    }

    startGame(){
        setInterval(this.selectRandomMole.bind(this), 3500);
        this.molesHit = 0;
        this.molesMax = 5;
        this.molesMin = Math.floor(this.molesMax/2);
        this.updatePanels();
    }

    restartGame(){
        this.moleRaisedCount = 0;
        this.currentPoints = 0;
        this.currentLevel = 1;
        this.molesHit = 0;
        this.molesMax = 5;
        this.molesMin = Math.floor(this.molesMax/2);
        this.raise_step = RAISE_STEP;
        this.raise_time = RAISE_TIME;
        this.updatePanels();
    }

    increaseLevel(){
        const audioSource = this.object.getComponent(HowlerAudioSource);
        if (audioSource) {
            console.log("win", audioSource);
            audioSource.play();
        }
        this.moleRaisedCount = 0;
        this.molesHit = 0;
        // this.molesMax += 5;
        this.molesMin = Math.floor(this.molesMax/2);
        this.currentLevel += 1;
        this.raise_time -= 200;
        this.raise_step += 0.015;
        this.updatePanels();
    }

    updatePanels(){
        this.gamePointsText.text = `Points: ${this.currentPoints}`;
        this.gameLevelText.text = `Level: ${this.currentLevel}`;
        this.gameMolesText.text = `Mole: ${this.moleRaisedCount} Min: ${this.molesMin} Hit: ${this.molesHit}/${this.molesMax}`;
    }

    selectRandomMole(){
        if(this.currentMoleIndex === 15){
            this.currentMoleIndex = 0;
        }else{
            this.currentMoleIndex += 1
        }
        if(this.moleRaisedCount === this.molesMax){
            this.checkNextGameStep();
        }else{
            const moleIndex = this.currentMoleIndex;//Math.ceil(Math.random() * 12)
            console.log(`selected mole${moleIndex > 9 ? '' : '0'}${moleIndex}`);
            this.currentMole = this.moles[moleIndex];
            this.raise = true;
            this.amount = RAISE_AMOUNT;
            this.initialMolePosition = this.currentMole.getPositionWorld();
            const that = this;
            console.log(`raised mole${moleIndex > 9 ? '' : '0'}${moleIndex}`);
            this.moleLoverTimeout = setTimeout(()=>{
                that.raise = false;
                this.amount = RAISE_AMOUNT;
                console.log(`lowered mole${moleIndex > 9 ? '' : '0'}${moleIndex}`);
            }, this.raise_time);
            this.moleRaisedCount += 1;
            this.updatePanels();
        }
    }

    update(dt) {
        if(this.currentMole && this.amount > 0){
            const position = this.currentMole.getPositionWorld();
            if(this.raise){
                position[1] += RAISE_STEP;
            }else{
                position[1] -= RAISE_STEP;
            }
            this.amount -= RAISE_STEP
            this.currentMole.setPositionWorld(position);
        }
    }

    checkNextGameStep(){
        console.log('checking next game step');
        console.log('moles raised', this.moleRaisedCount);
        console.log('moles hit', this.molesHit);
        console.log('moles min', this.molesMin);
        console.log('moles max', this.molesMax);
        if(this.moleRaisedCount === this.molesMax){
            // we have reached the end of the game! check if we will reset or increase level
            if(this.molesHit >= this.molesMin){
                this.increaseLevel();
            }else{
                this.restartGame();
            }
        }
    }

    hitCurrentMole(){
        if(this.currentMole){
            clearTimeout(this.moleLoverTimeout);
            this.currentMole.setPositionWorld(this.initialMolePosition);
            this.currentPoints += 1 * this.currentLevel;
            this.molesHit += 1;
            this.updatePanels();
        }
    }

}

