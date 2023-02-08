export function fetchChatRooms() {
    const jsonArray =
        '[{ "name": "AwesomeGroup", "goTo": "/", "imageURL": "https://d368g9lw5ileu7.cloudfront.net/races/race53618-social1200x630.bAaECm.jpg" },{ "name": "BadGroup", "goTo": "/about", "imageURL":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bad_album_logo.svg/640px-Bad_album_logo.svg.png"}]';
    return JSON.parse(jsonArray);
}
