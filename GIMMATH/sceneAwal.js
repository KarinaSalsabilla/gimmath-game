class sceneAwal extends Phaser.Scene {
    constructor() {
        super('sceneAwal');
    }

    preload() {
        // Video
        this.load.video('vid1', 'assets/video/Video_Siap_Suasana_Mencekam.mp4');
        this.load.video('vid2', 'assets/video/video_melihat_pintu.mp4');
        this.load.video('vid3', 'assets/video/video_masuk_pintu.mp4');

        // UI
        this.load.image('dialog', 'assets/images/dialogplayer.jpeg');
        this.load.image('nextBtn', 'assets/icon/next.png');
    }

    create() {
        this.step = 0;
        this.showVideo1();
    }

    // ================= VIDEO 1 =================
    showVideo1() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.video = this.add.video(width / 2, height / 2, 'vid1');
    this.video.setDisplaySize(width, height);
    this.video.play();

    this.video.on('complete', () => {

        // 🎬 Fade out video
        this.tweens.add({
            targets: this.video,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                this.video.destroy();

                // 🎬 Fade in dialog
                this.showDialog([
                    "Aku sedang dimana ini?",
                    "ruangan ini bukan seperti ruang kelas biasanya"
                ], () => {
                    this.showVideo2();
                });
            }
        });

    });
}

    // ================= VIDEO 2 =================
    showVideo2() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.video = this.add.video(width / 2, height / 2, 'vid2');
    this.video.setDisplaySize(width, height);
    this.video.play();

    this.video.on('complete', () => {

        // 🎬 Fade out video
        this.tweens.add({
            targets: this.video,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                this.video.destroy();

                // 🎬 Fade in dialog
                this.showDialog([
                    "Pintu apa itu? Perasaan sebelumnya tidak ada pintu disitu?",
                    "apa aku coba masuk ke pintu itu?"
                ], () => {
                    this.showVideo3();
                });
            }
        });

    });
}

    // ================= VIDEO 3 =================
    showVideo3() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.video = this.add.video(width / 2, height / 2, 'vid3');
        this.video.play();

        this.video.on('complete', () => {
            this.scene.start('Level1');
        });
    }

    // ================= DIALOG SYSTEM =================
    showDialog(texts, callback) {
    const width = this.scale.width;
    const height = this.scale.height;

    let index = 0;

    let dialogBox = this.add.image(width / 2, height, 'dialog')
    .setOrigin(0.5, 1);

    let text = this.add.text(width / 2, height - (height * 0.15), texts[index], {
        fontSize: '22px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: width * 0.8 }
    }).setOrigin(0.5); 

    let next = this.add.image(width - 50, height - 40, 'nextBtn')
    .setInteractive()
    .setScale(0.5);

    // NAMA PLAYER
    let nameText = this.add.text(width * 0.28, height - (height * 0.29), "Player", {
        fontSize: '20px',
        color: '#ffffff',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    let scaleX = width / dialogBox.width;
    dialogBox.setScale(scaleX);

    // 🔥 Fade in
    dialogBox.setAlpha(0);
    text.setAlpha(0);
    next.setAlpha(0);

    this.tweens.add({
        targets: [dialogBox, text, next],
        alpha: 1,
        duration: 500
    });

    next.on('pointerdown', () => {
        index++;

        if (index < texts.length) {
            text.setText(texts[index]);
        } else {
            dialogBox.destroy();
            text.destroy();
            next.destroy();
            callback();
        }
    });
}
}