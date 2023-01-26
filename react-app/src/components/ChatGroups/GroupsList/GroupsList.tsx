import Group from "../Group/Group";
// import Icon from "../Group/Icon";
// import { Link } from 'react-router-dom';
// import style from './GroupsList.module.css';

interface Props {
  name: string;
  imageURL: string; // url ?
  goTo: string;
}

function GroupsList() {
  const list = getAllGroups();
  return (
    <>
      {list.map((index: Props) => (
        <Group goTo={index.goTo} name={index.name} imgURL={index.imageURL} />
      ))}
    </>
  );
}

function getAllGroups() {
  // TO DO: function to search to groups of the user
  const jsonArray =
    '[{ "name": "AwesomeGroup", "goTo": "/", "imageURL": "https://d368g9lw5ileu7.cloudfront.net/races/race53618-social1200x630.bAaECm.jpg" },{ "name": "BadGroup", "goTo": "/about", "imageURL":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bad_album_logo.svg/640px-Bad_album_logo.svg.png"}]';
  return JSON.parse(jsonArray);
}

export default GroupsList;
