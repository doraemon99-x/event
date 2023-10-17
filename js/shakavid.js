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
                        drm: {
                            servers: {
                                'com.widevine.alpha': 'https://license.pallycon.com/ri/licenseManager.do?pallycon-customdata-v2=eyJkcm1fdHlwZSI6IlBsYXlSZWFkeSIsInNpdGVfaWQiOiJNUURUIiwidXNlcl9pZCI6IjEyODMyOTQ1MCIsImNpZCI6ImZiNGM2ODU0MWNiMSIsInBvbGljeSI6IjVreGtTMkcrSGxIUm9hZ29QMGFOd2YxYll0MTBKZVlKMmhCVno3OGxkMmdCUHJBRWU5Z0NPb05ubXVJSWJGejB0aEp4WWtocmhTWXloSGpxS3Fsb292Z2x1R3dpT04zcTI3aUF1S1NBenFvelJxWnp6aXUzOWUveTBBWHd5S2Z1IiwidGltZXN0YW1wIjoiMjAyMy0xMC0xN1QxOTozODowM1oiLCJoYXNoIjoiekJ4RFFodFpyc0grTllETEdISnZpKzJCdVByTTdOZlh5alYya1hySm9Kcz0iLCJrZXlfcm90YXRpb24iOmZhbHNlfQ=='
                            }
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