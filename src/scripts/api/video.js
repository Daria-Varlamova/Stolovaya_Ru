let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '405',
        width: '100%',
        videoId: 'Tl1vymt1fE0',
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0,
        }
    });

    const durationControl = $('#durationLevel')[0];
    const miclevel = $('#miclevel')[0];
    durationControl.min = 0;
    durationControl.value = 0;
    miclevel.min = 0;
    miclevel.max = 100;

    let isRangeChanging = false;

    function onPlayerReady(event) {
        miclevel.value = event.target.getVolume();

        const interval = setInterval(() => {
            if (isRangeChanging) { return };
            const currTime = event.target.getCurrentTime();
            durationControl.value = currTime;
        })
    }

    let done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        // player.stopVideo();
    }

    const eventsInit = () => {
        $('#playButton').click(() => {
            $('#pauseButton').show();
            $('#playButton').hide();

            durationControl.max = Math.ceil(player.getDuration());
            const currentTime = Math.ceil($('#durationLevel')[0].value);

            if (currentTime > 0) {
                player.seekTo(currentTime, true);
                player.playVideo(0);
            } else {
                player.playVideo();
            }
        });

        $('#pauseButton').click(() => {
            $('#pauseButton').hide();
            $('#playButton').show();
            player.pauseVideo();
        });

        $('#durationLevel').on('input', () => {
            isRangeChanging = true;
            $('#pauseButton').show();
            $('#playButton').hide();
            const seconds = $('#durationLevel')[0].value;
            console.log(seconds);
            player.seekTo(seconds, false);
        });

        $('#durationLevel').on('change', () => {
            $('#pauseButton').show();
            $('#playButton').hide();
            const seconds = $('#durationLevel')[0].value;
            player.seekTo(seconds, true);
            setTimeout(() => isRangeChanging = false, 1000);
            player.playVideo(0);
        });

        $('#miclevel').on('input', () => {
            miclevel.value = $('#miclevel')[0].value;
            player.setVolume(miclevel.value);
        });

    }

    eventsInit();
}