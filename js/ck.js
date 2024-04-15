$(document).ready(function(){
    (function () {
            var video = document.querySelector('#player');
            initApp();
    
            function initApp() {
                shaka.polyfill.installAll();
                if (shaka.Player.isBrowserSupported()) {
                    initPlayer();
                } else {
                    console.error('Browser not supported!');
                }
            }
            
            function initPlayer() {
                var video = document.querySelector('#player');
                var player = new shaka.Player(video);
                player.addEventListener('error', onErrorEvent);
    
                player.configure({
                    drm: {
                        clearKeys: {
                            // 'key-id-in-hex': 'key-in-hex',
                            '4d38060bf41b3c29df0ec950ece6b5da': '7ee9506b13480491d79b71c062ab5366',
                            '50053fb452c6b15716f8eb9b0e524278': 'c2608ef05318c7d7ea9b3694798cb15f'
                          }
                    }
                });
                
    
                player.load(window.atob(data.widevine))
                    .then(function () {
    
                        var variantTracks = player.getVariantTracks();
                        var bitrates = [];
                        variantTracks.sort(function (a, b) {
                            return a.bandwidth - b.bandwidth;
                        });
                        var groupAudios = [];
                        for (var i = 0; i <= variantTracks.length - 1; i++) {
                            if (groupAudios.includes(variantTracks[i].audioId)) {
                                break;
                            }
                            groupAudios.push(variantTracks[i].audioId);
                        }
                        for (var i = groupAudios.length - 1; i <= variantTracks.length - 1; i += groupAudios.length) {
                            bitrates.push(variantTracks[i]);
                        }
                        
                        new Plyr(video, {
                            controls: ["play-large", "pause-large", "play", "mute", "volume", "live", "settings", "pip", "fullscreen"],
                            settings: ['quality', 'speed', 'loop'],
                            speed: {
                                        selected: 1,
                                        options: [0.5, 0.75, 1]
                                    },
                            quality: {
                                options: bitrates.map(j => j.height),
                                forced: true,
                                onChange: function (newQuality) {
                                    player.configure({
                                        abr: {
                                            enabled: false
                                        }
                                    })
                                    
                                    var tracks = player.getVariantTracks().filter(tk => tk.height === newQuality)
                                    player.selectVariantTrack(tracks[0], true);
                                }
                            }
                        });
                        player.speed = 1;
                    });
            }
    
            function onErrorEvent(event) {
                console.error(event.detail);
            }
    })();
    });