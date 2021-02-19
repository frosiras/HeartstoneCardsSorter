import React, {useEffect, useState} from "react";
import cardsGetter from './fetchQueries/card.service'
import { Table,
    ButtonGroup,
    Nav,
    Navbar,
    CardImg,
    Card,
    Button,
    Row
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {

    const [added, setAdded] = useState([]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [length, setLength] = useState(0)
    const [cardPerPage, setCardsPerPage] = useState(10)

    useEffect(()=>{
            setLoading(true);
            cardsGetter.getCardsByOrder(added, currentPage, cardPerPage)
                .then(async (res)=>{
                    let data = await res.json();
                    setCards(data.cards)
                    setLength(data.length)
                })
        setLoading(false);
    })

    const clear = () => {
        setAdded([]);
    }

    const addHealth = (order) => {
        // order = 'asc'/'desc'
        let exists = false;
        for (let i = 0; i < added.length; i++){
            if (added[i].includes('health'))
                exists = true
        }
        if (!exists) {
            let newAdded = added;
            newAdded.push(['health', order]);
            setAdded(newAdded)
        }
    }

    const addAttack = (order) => {
        let exists = false;
        for (let i = 0; i < added.length; i++){
            if (added[i].includes('attack'))
                exists = true
        }
        if (!exists) {
            let newAdded = added;
            newAdded.push(['attack',order]);
            setAdded(newAdded)
        }
    }

    const addName = (order) => {
        let exists = false;
        for (let i = 0; i < added.length; i++){
            if (added[i].includes('name'))
                exists = true
        }
        if (!exists) {
            let newAdded = added;
            newAdded.push(['name',order]);
            setAdded(newAdded)
        }
    }

    const addCost = (order) => {
        let exists = false;
        for (let i = 0; i < added.length; i++){
            if (added[i].includes('cost'))
                exists = true
        }
        if (!exists) {
            let newAdded = added;
            newAdded.push(['cost',order]);
            setAdded(newAdded)
        }
    }

    const setPage = (number) => {
        setCurrentPage(number);
    }


    let Pagination;
    const first = '<<'
    const previous = '<'
    let closeButtons = [];
    // PAGE 1
    if (currentPage === 1){
        for (let i = 2; i < 4; i++)
            closeButtons.push((
                <Button onClick={()=>{setPage(i)}}>{i}</Button>
            ))
        Pagination = (
            <ButtonGroup>
                <Button onClick={()=>{setPage(1)}} > {first} </Button>
                <Button onClick={()=>{setPage(currentPage-1)}} > {previous} </Button>
                <Button onClick={()=>{setPage(1)}} active={true}>1</Button>
                {closeButtons}
                <Button disabled active={false}>...</Button>
                <Button onClick={()=>{setPage(currentPage+1)}} active={true}> > </Button>
                <Button onClick={()=>{setPage(length)}} active={true}> >> </Button>
            </ButtonGroup>
        )}
    // PAGE 2
    else if ( currentPage === 2 ) {
        for (let i = 3; i < 5; i++)
            closeButtons.push((
                <Button onClick={()=>{setPage(i)}}>{i}</Button>
            ))
        Pagination = (
            <ButtonGroup>
                <Button onClick={()=>{setPage(1)}} > {first} </Button>
                <Button onClick={()=>{setPage(currentPage-1)}} > {previous} </Button>
                <Button onClick={()=>{setPage(1)}}>1</Button>
                <Button onClick={()=>{setPage(2)}} active={true}>2</Button>
                {closeButtons}
                <Button disabled active={false}>...</Button>
                <Button onClick={()=>{setPage(currentPage+1)}} > > </Button>
                <Button onClick={()=>{setPage(length)}}> >> </Button>
            </ButtonGroup>
        )
    }
    // PAGE 3
    else if ( currentPage === 3 ) {
        for (let i = 4; i < 6; i++)
            closeButtons.push((
                <Button onClick={()=>{setPage(i)}}>{i}</Button>
            ))
        Pagination = (
            <ButtonGroup>
                <Button onClick={()=>{setPage(1)}} > {first} </Button>
                <Button onClick={()=>{setPage(currentPage-1)}} > {previous} </Button>
                <Button disabled active={false}>...</Button>
                <Button onClick={()=>{setPage(2)}}>2</Button>
                <Button onClick={()=>{setPage(3)}} active={true}>3</Button>
                {closeButtons}
                <Button disabled active={false}>...</Button>
                <Button onClick={()=>{setPage(currentPage+1)}} > > </Button>
                <Button onClick={()=>{setPage(length)}}> >> </Button>
            </ButtonGroup>
        )
    }

    // LAST PAGE
    else if (currentPage === length) {
        for (let i = currentPage-3; i < currentPage+1; i++)
            if (i === currentPage)
                closeButtons.push((
                    <Button onClick={()=>{setPage(i)}} active={true}>{i}</Button>
                ))
            else
                closeButtons.push((
                    <Button onClick={()=>{setPage(i)}}>{i}</Button>
                ))
        Pagination = (
            <ButtonGroup>
                <Button onClick={()=>{setPage(1)}} > {first} </Button>
                <Button onClick={()=>{setPage(currentPage-1)}} > {previous} </Button>
                <Button disabled active={false}>...</Button>
                {closeButtons}
                <Button disabled active={false}>...</Button>
                <Button onClick={()=>{setPage(currentPage+1)}} > > </Button>
                <Button onClick={()=>{setPage(length)}}> >> </Button>
            </ButtonGroup>
        )

    }
    else {
        for (let i = currentPage-1; i < currentPage+3; i++)
            if (i === currentPage)
                closeButtons.push((
                    <Button onClick={()=>{setPage(i)}} active={true}>{i}</Button>
                ))
            else
                closeButtons.push((
                    <Button onClick={()=>{setPage(i)}}>{i}</Button>
                ))
        Pagination = (
            <ButtonGroup>
                <Button onClick={()=>{setPage(1)}} > {first} </Button>
                <Button onClick={()=>{setPage(currentPage-1)}} > {previous} </Button>
                <Button disabled active={false}>...</Button>
                {closeButtons}
                <Button disabled active={false}>...</Button>
                <Button onClick={()=>{setPage(currentPage+1)}} > > </Button>
                <Button onClick={()=>{setPage(length)}}> >> </Button>
            </ButtonGroup>
        )
    }
    return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Heartstone</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Button onClick={clear}>Clear</Button>
                </Nav>
                <Nav>
                    <Nav.Link href="/login"><Button>Log in</Button></Nav.Link>
                    <Nav.Link href="/reg"><Button>Sing up</Button></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
            <Table>
                <thead>
                    <th>Attack</th>
                    <th>Cost</th>
                    <th>Health</th>
                    <th>Name</th>
                </thead>
                <tbody>
                    <tr>
                        <td><Button as='input' value='DESC' onClick={()=> addAttack('DESC')}></Button><Button as='input' value='ASC' onClick={()=> addAttack('ASC')}></Button></td>
                        <td><Button as='input' value='DESC' onClick={()=> addCost('DESC')}></Button><Button as='input' value='ASC' onClick={()=> addCost('ASC')}></Button></td>
                        <td><Button as='input' value='DESC' onClick={()=> addHealth('DESC')}></Button><Button as='input' value='ASC' onClick={()=> addHealth('ASC')}></Button></td>
                        <td><Button as='input' value='DESC' onClick={()=> addName('DESC')}></Button><Button as='input' value='ASC' onClick={()=> addName('ASC')}></Button></td>
                    </tr>
                </tbody>
            </Table>
            <Row>
                {cards.map((card, key)=>{
                    return (
                        <Card>
                            <CardImg style={{width: '300px', height: '300px'}} src={card}/>
                        </Card>
                    )
                })}
            </Row>
            {Pagination}
        </div>
    );
}

export default App;
