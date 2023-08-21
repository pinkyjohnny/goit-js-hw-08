import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
    console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
    console.log('title:', title);
});

player.on('timeupdate', throttle((props) => {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(props.seconds));
}, 1000));

function onLoadPage() {
    const data = localStorage.getItem('videoplayer-current-time');
    const parseData = JSON.parse(data);
    player.setCurrentTime(parseData);
};

onLoadPage()