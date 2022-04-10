import Card from "../card/card";
import './card-list.css'

//Whenever props change a component rerenders
const CardList = ({ monsters }) => (
    <div className="card-list">
        {monsters.map(monster => {
            return (
                <Card monster={monster}/>
        )})}
    </div>
)


export default CardList;