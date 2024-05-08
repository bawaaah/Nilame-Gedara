import React, {useState,useEffect} from 'react'
import axios from 'axios'


function SelectProduct() {

    const [product,setProduct] = useState([])
    // const [check,setCheck] = useState()

    useEffect(()=>{
        getProduct();
    },[])

    // useEffect(())


    function getProduct(){
        axios.get("http://localhost:8070/selectProductRouter/")
        .then((res)=>{
            setProduct(res.data)
        })
        .catch((err)=>{
            alert(err)
        })
    }

    

    function setItem(productData){

        async function postDataToMongoDB(data) {
        const url = 'http://localhost:8070/add/add'; // URL of your API endpoint

        try {
            // Using Axios to POST data
            const response = await axios.post(url, data);
            console.log('Data posted successfully:', response.data);
            return response.data;  // or handle response as needed
        } catch (error) {
            // Error handling
            console.error('Error posting data:', error.response ? error.response.data : error.message);
            throw error;  // Re-throw or handle error as needed
        }
        }

        

        // Call the function with the example data
        postDataToMongoDB(productData)
        .then(result => console.log("Success:", result))
        .catch(err => console.log("Error:", err));


            }

    function deleteProduct(itemId){
        axios.delete(`http://localhost:8070/add/deleteItem/${itemId}`)
            .then((req,res) => {
                alert("Product deleted successfully")
                window.location.reload();

            })
            .catch((err) => {
                alert("Error deleting product: " + err.message)
                console.error(err)
            });
    }

    function isSelected(itemID,isCheck){
        axios.put(`http://localhost:8070/add/isSelect/${itemID}`,{isSelect: isCheck})
            .then((req,res) => {
                alert("Product Update successfully")
                window.location.reload();

            })
            .catch((err) => {
                alert("Error Updating isSelect: " + err.message)
                console.error(err)
            });
    }


    // function checkDisplay(event){

    //     if(event.target.checked){
    //         console.log("okay")
    //         const Data = (product.filter(item => item._id === event.target.value))

    //         const productData = {
    //             pid: Data[0]._id,
    //             name: Data[0].name,
    //             pQty: Data[0].pid,
    //             category: Data[0].category,
    //             description: Data[0].description,
    //             rentalPrice: Data[0].rentalPrice,
    //             availability: Data[0].availability,
    //             image: Data[0].image
    //             };
            
    //         console.log("yes")
    //         setItem(productData)
    //         console.log(event.target.value)
    //         isSelected(event.target.value, true)
    //         getIsSelect(event.target.checked)


    //     }else{

    //         deleteProduct(event.target.value)
    //         console.log("no")
    //         isSelected(event.target.value, false)
    //         getIsSelect(event.target.checked)

            
    //     }
    // }

    function checkDisplay(item,checked){

        setProduct(currentData =>
            currentData.map(x => x._id === item._id ? { ...x, checked } : x))

            console.log(product)

        if(checked){
            console.log("okay")
            const Data = (product.filter(prod => prod._id === item._id))

            const productData = {
                pid: Data[0]._id,
                name: Data[0].name,
                pQty: Data[0].pid,
                category: Data[0].category,
                description: Data[0].description,
                rentalPrice: Data[0].rentalPrice,
                availability: Data[0].availability,
                image: Data[0].image
                };
            
            console.log("yes")
            setItem(productData)
            console.log(item._id)
            isSelected(item._id, true)
 


        }else{

            deleteProduct(item._id)
            console.log("no")
            isSelected(item._id, false)


            
        }


        // axios.get(`http://localhost:8070/selectProductRouter/single/${item._id}`)
        // .then((res)=>{
        //     setCheck(res.data)
        // })
        // .catch((err)=>{
        //     alert(err)
        // })

        // window.location.reload();
    }

    // function getIsSelect(item,checked){

    //     setProduct(currentData =>
    //         currentData.map(x => x._id === item._id ? { ...x, checked } : x))




    //     axios.get(`http://localhost:8070/selectProductRouter/single/${item._id}`)
    //     .then((res)=>{
    //         setCheck(res.data)
    //     })
    //     .catch((err)=>{
    //         alert(err)
    //     })
    // }


    const styles = {
        container: {
          textAlign: 'center',
          marginTop: '10px',
          padding: '20px'


        },
        table: {
          margin: '0 auto',
          borderCollapse: 'collapse',
          backgroundColor: '#f0e6d2',


        },
        th: {
          padding: '10px 15px',
          backgroundColor: '#2a0a0b',
          color: '#d4bb9d',
          border: '1px solid #d4bb9d'
        },
        td: {
          padding: '10px 15px',
          color: '#2a0a0b',
          border: '1px solid #d4bb9d'
        },
        checkbox: {
          cursor: 'pointer'
        }
      };
    
      return (
        <div style={styles.container}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Rental Price</th>
                <th style={styles.th}>Availability</th>
                <th style={styles.th}>Damaged Qty</th>
                <th style={styles.th}>Disposed Qty</th>
                <th style={styles.th}>Display</th>
              </tr>
            </thead>
            <tbody>
              {product.map(d => (
                <tr key={d._id}>
                  <td style={styles.td}>{d.name}</td>
                  <td style={styles.td}>{d.category}</td>
                  <td style={styles.td}>{d.description}</td>
                  <td style={styles.td}>RS: {d.rentalPrice}</td>
                  <td style={styles.td}>{d.availability ? 'Yes' : 'No'}</td>
                  <td style={styles.td}>{d.DamagedQty ? d.DamagedQty : '0'}</td>
                  <td style={styles.td}>{d.DisposedQty ? d.DisposedQty : '0'}</td>
                  <td style={styles.td}>
                    <input
                      style={styles.checkbox}
                      type="checkbox"
                      checked={d.isSelect}
                      onChange={(e) => checkDisplay(d,e.target.checked)}
                      value={d._id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  )
}


export default SelectProduct