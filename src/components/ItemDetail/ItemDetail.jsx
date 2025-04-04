import { useEffect, useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';
import { Link, useParams } from 'react-router';
import { fetchdata } from '../../fetchdata';
import Loader from '../Loader/Loader';

function ItemDetail () {
    const {id} = useParams();
    const [loading,setLoading] = useState(true);
    const [producto,setProducto] = useState(null);
    const [contador,setContador] = useState(1);
    

    function agregarACarrito (prod){
        // const nuevoProd = {
        //     ...prod,
        //     cantidad: contador,
        // };
        console.log("vas a agregar",{...prod, cantidad: contador})
        setContador(1)
    };

    useEffect (()=> {
        fetchdata(false)
        .then(resp => {
            const prodAMostrar = resp.find(el=>el.id === parseInt(id))
            setProducto(prodAMostrar)
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
        .catch(err => console.log(err))
    },[]);

    return (
        loading ? <Loader /> :
        <div className="card">
            {
                producto ?
                <>
                <p>{producto ? producto.nombre : "Cargando"}</p>
                <h3 className="card-head">{producto.nombre}</h3>
                <h4 className="">{producto.marca}</h4>
                <div className="card-body"> 
                    <h5 className="">Precio: ${producto.precioARS} / U${producto.precioUSD}</h5>
                    <p className="">{producto.descripcion} ({producto.categoria})</p>
                    <p className="">{producto.stock} unidades disponibles</p>
                    <ItemCount stock={producto.stock} contador={contador} setContador={setContador}/>
                    <button className="btn btn-secondary" onClick={()=> agregarACarrito(producto)}>Agregar al carrito</button>
                    <br/>
                    <Link to="/">
                        <button className="btn btn-secondary">Volver al inicio</button>
                    </Link>
                </div>
                </>
                :
                <p>Producto no encontrado</p>
            }
        </div>
    );
};

export default ItemDetail;