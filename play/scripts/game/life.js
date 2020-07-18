const initialBpm = 0;
const intermediateBpm = 40;
const highBpm = 70;
const veryHighBpm = 85;
const maxBpm = 100;
const initialFirstAid = 1;
const maxFirstAid = 1;
const colorGreen = '#008000';
const colorYellow = '#F9B100';
const colorRed = '#8A0707';

class Life {
    constructor (imgFirstAid) {
        this.imgFirstAid = imgFirstAid;
        this.bpm = initialBpm;
        this.maxBpm = maxBpm;

        this.firstAid = initialFirstAid;
        this.maxFirstAid = maxFirstAid;
        this.firstAidHasDecreased = false;

        this.imgFirstAidX = 150;
        this.imgFirstAidY = 10;
        this.imgFirstAidWidth = 30;
        this.imgFirstAidHeight = 25;

        this.imgStress = imgStressGreen;

        this.textSize = 20;
    }
    
    display() {
        this.displayBpm();

        this.displayFirstAid();

        // for (let i = 0; i < this.firstAid; i++) {
        //     const imgMargin = i + 5;
        //     const imgPosition = this.imgFirstAidInitialX + this.imgFirstAidWidth * (i + 1);
        //     image(this.imgFirstAid, imgMargin + imgPosition, this.imgFirstAidY, this.imgFirstAidWidth, this.imgFirstAidHeight);
        // }
    }

    increaseBpm() {
        this.textSize = 30;
        if (this.bpm <= maxBpm){
            let bpmIncrease = Math.floor(Math.random() * 5) + 1;
            // let bpmIncrease = 1;

            if ((this.bpm + bpmIncrease) <= maxBpm) {
                this.bpm = this.bpm + bpmIncrease;
            }
            else {
                this.bpm = maxBpm;
            }
        }
        else {
            this.bpm = maxBpm;
        }
    }

    resetBpm() {
        this.bpm = initialBpm;
        this.firstAidHasDecreased = false;
    }

    decreaseBpm(quantity) {
        if (quantity === null  || quantity === undefined) {
            this.bpm = Math.floor(this.bpm/2);
        }
        else {
            if (this.bpm - quantity > 0) {
                this.bpm = this.bpm - quantity;
            }
            else {
                this.bpm = 0;
            }  
        }
    }

    increaseFirstAid() {
        if (this.firstAid < maxFirstAid) {
            this.firstAid++;
        }
    }

    decreaseFirstAid() {
        if (this.firstAid > 0) {
            this.firstAid--;
            return false;
        }
        else {
            return true;
        }
    }

    resetFirstAid() {
        this.firstAid = initialFirstAid;
    }

    displayBpm() {
        image(this.imgStress, 20, 5);

        if (this.bpm <= intermediateBpm) {
            this.imgStress = imgStressGreen;
            P5Style.bpmCountStyle(colorGreen, this.textSize);
        }
        else if (this.bpm <= highBpm) {
            this.imgStress = imgStressYellow;
            P5Style.bpmCountStyle(colorYellow, this.textSize);
        }
        else if (this.bpm <= veryHighBpm) {
            this.imgStress = imgStressRed;
            P5Style.bpmCountStyle(colorRed, this.textSize);
        }
        else {
            this.imgStress = imgStressBomb;
            P5Style.bpmCountStyle(colorRed, this.textSize);
        }
        text(this.bpm, 70, 30);
        this.textSize = 20;
    }

    displayFirstAid() {
        image(this.imgFirstAid, this.imgFirstAidX, this.imgFirstAidY, this.imgFirstAidWidth, this.imgFirstAidHeight);
        P5Style.firstAidCountStyle();
        text(this.firstAid + "/" + maxFirstAid, this.imgFirstAidX + 40, 30);
    }
}