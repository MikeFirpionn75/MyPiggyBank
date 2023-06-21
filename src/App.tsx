import { useState, useEffect } from 'react'
import { v4 as uuidv4} from 'uuid';

import './App.css'


export interface Move {
  name : string
  description : string
  price: number
  id: string
}


function App() {

  // const depense1 : Move = {name:'netflix', description:'juin', price :15, id: uuidv4()}
  // const depense2 : Move = {name:'fitnessPark', description:'juin', price :30 , id: uuidv4()}
  

  
  const [value, setValue] = useState<string[]>(['','',''])
  
  const [count, setCount] = useState<Move[]>(()=>{
    let storage = localStorage.getItem('name')
    if(storage){
      return JSON.parse(storage)
    }else{
      return []
    }
  })

  useEffect(()=>{
    localStorage.setItem('name', JSON.stringify(count))
  },[count])
  


  function removeDepense(element:Move){
    const indexElem = count.indexOf(element)
    let countCopy = [...count]
    countCopy.splice(indexElem,1)
    setCount(countCopy)
  }

  function add(){
    let total = 0 
    count.forEach((elem)=>{
      total = total + elem.price
    })
    
    return total
  }
  
  function submit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault()
    const valueInt = parseInt(value[2])
      if (!isNaN(valueInt) && value[0].length>0){
        let depense:Move = {name: value[0], description:value[1], price:valueInt, id: uuidv4()} 
        let newCount = [...count]
        newCount.push(depense)
        setCount(newCount)
        console.log(count)
        setValue(['','',''])
      }
      else{
        alert ('The price should be a number and the name is compulsory')
      }
    
  }

  return (
    <>
    <h1>My Piggy Bank</h1>
    <table>
    <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th className='empty'></th>

        </tr>
    </thead>
    <tbody> 
      {count.map((element, index) => (
        <tr key={index}>
          <td className='1'>{element.name}</td>
          <td className='2'>{element.description}</td>
          <td className='3'>{element.price}</td>
          <td className='4'><button className='cross' onClick={()=>removeDepense(element)}>X</button></td>
        </tr>
      ))}
    </tbody>
</table>
{count.length >0 && <p>total = {add()}</p>}
<h2>Add new expense</h2>
<form style = {{width:'80%'}}> 
  <label htmlFor = {'name'}> Name </label>
  <input name ={'name'}  value={value[0]} onChange ={(e)=> setValue([e.target.value,value[1],value[2]])}></input>
  <label htmlFor = {'descrption'}> Description </label>
  <textarea name ={'description'} value={value[1]} onChange ={(e) => setValue([value[0],e.target.value,value[2]])}></textarea>
  <label htmlFor = {'price'}> Price </label>
  <input name ={'price'} value={value[2]} onChange ={(e) => setValue([value[0],value[1],e.target.value])}></input>
  <button onClick={(e)=> submit(e)}type="submit" className='submit'>Submit</button>
</form>

    </>
  )
}

export default App
