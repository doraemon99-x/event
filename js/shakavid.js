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
                              'com.widevine.alpha': 'https://tipicors.fly.dev/https://license.pallycon.com/ri/licenseManager.do?pallycon-customdata-v2=eyJkcm1fdHlwZSI6IldpZGV2aW5lIiwic2l0ZV9pZCI6Ik1RRFQiLCJ1c2VyX2lkIjoiMTI4MzI5NDUwIiwiY2lkIjoiZmI0YzY4NTQxY2IxIiwicG9saWN5IjoiNWt4a1MyRytIbEhSb2Fnb1AwYU53ZjFiWXQxMEplWUoyaEJWejc4bGQyZ0JQckFFZTlnQ09vTm5tdUlJYkZ6MHRoSnhZa2hyaFNZeWhIanFLcWxvb3ZnbHVHd2lPTjNxMjdpQXVLU0F6cW96UnFaenppdTM5ZS95MEFYd3lLZnUiLCJ0aW1lc3RhbXAiOiIyMDIzLTEwLTE3VDE5OjAyOjExWiIsImhhc2giOiI4bGhUcFJIb3FQZFluYlg3UWNCczJHRnhmbjRFc0R2S1lRWGhPSFNHNjQ4PSIsImtleV9yb3RhdGlvbiI6ZmFsc2V9'
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