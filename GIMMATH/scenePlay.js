class scenePlay extends Phaser.Scene {
    constructor() {
        super({ key: 'scenePlay' });
        this.fontLoaded = false;
    }

    preload() {
        this.load.image('bg', 'assets/images/gambardepan.jpeg');
        this.load.image('play', 'assets/icon/play.png');
        this.load.image('settings', 'assets/icon/settings.png');
        this.load.image('information', 'assets/icon/information.png');
        this.load.image('tutorial', 'assets/icon/pertanyaan.png');
        this.load.image('close', 'assets/icon/close.png');
        // this.load.audio('musicMenu', 'assets/audio/music_menu.mp3');
        // this.load.audio('musicButton', 'assets/audio/button.m4a');
        // this.load.audio('musicOn', 'assets/audio/fx_touch.mp3');

    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        let bg = this.add.image(width / 2, height / 2, 'bg');
        bg.setDisplaySize(width, height);


        // 🔹 FUNCTION BIAR GAK NGULANG KODE
        // 🔹 FUNCTION BUTTON
const setupButton = (btn, name) => {
    btn.setInteractive({ useHandCursor: true }).setScale(1.5);

    btn.on('pointerdown', () => {
        this.tweens.add({
            targets: btn,
            scale: 1.6, // sedikit lebih besar (dari 1.5)
            duration: 80,
            yoyo: true,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                btn.setScale(1.5);
                console.log(name + ' clicked!');
            }
        });
    });
};


        // BUTTON PLAY
        let playBtn = this.add.image(width / 2, height * 0.8, 'play');
        setupButton(playBtn, 'Play');

        // BUTTON SETTINGS
        let setBTN = this.add.image(width / 2 + 140, height * 0.8, 'settings');
        setupButton(setBTN, 'Settings');

        // BUTTON TUTORIAL
        let tutorBTN = this.add.image(width / 2 - 140, height * 0.8, 'tutorial');
        setupButton(tutorBTN, 'Tutorial');

        // BUTTON INFORMATION (pojok kiri atas)
        let inforBTN = this.add.image(80, 80, 'information');
        setupButton(inforBTN, 'Information');

        // BUTTON CLOSE (pojok kanan atas)
        let closeBTN = this.add.image(width - 80, 80, 'close');
        setupButton(closeBTN, 'Close');

        document.fonts.load('120px CreepsterRegular').then(() => {
            let title = this.add.text(width / 2, height * 0.2, 'GIMMATH', {
                fontFamily: 'CreepsterRegular',
                fontSize: '130px',
                color: '#ff0000',
                stroke: '#4b1e1e',
                strokeThickness: 6
            }).setOrigin(0.5);

            // 🔥 Animasi kedip
            this.tweens.add({
                targets: title,
                alpha: 0.6,
                duration: 800,
                yoyo: true,
                repeat: -1
            });

        });
    }
}