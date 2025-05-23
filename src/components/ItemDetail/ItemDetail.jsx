import { Link, useParams } from 'react-router';
import Loader from '../Loader/Loader';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';
import { useState } from 'react';
import { useAppContext } from '../../context/context';
import Swal from 'sweetalert2';

function ItemDetail() {
    const { id } = useParams();
    const [contador, setContador] = useState(1);
    const { products, loading, addToCart } = useAppContext();
    const producto = products.find(el => String(el.id) === String(id));

    const itemDetailAddToCart = () => {
        if (producto && producto.stock >= contador) {
            addToCart(producto, contador);
            setContador(1);
            Swal.fire({
                title: '¡Producto agregado!',
                text: `Se ha añadido al carrito ${contador} ${producto.nombre} `,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false
            });
        }
    };

    return (
        loading ? <Loader /> :
            <div className="card-detail">
                {
                    producto ?
                        <>
                            <div className="card-detail-head">
                                <h3>{producto.nombre}</h3>
                                <h4>{producto.marca}</h4>
                                <p>{producto.descripcion} ({producto.categoria})</p>
                            </div>
                            <div className="card-detail-count">
                                <h5 className="">Precio: ${producto.precioARS} / U${producto.precioUSD}</h5>
                                <p className="">{producto.stock} unidades disponibles</p>
                                <ItemCount 
                                    stock={producto.stock} 
                                    contador={contador} 
                                    setContador={setContador}
                                />
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={itemDetailAddToCart}
                                    disabled={producto.stock === 0 || contador > producto.stock}>
                                    {producto.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                                </button>
                            </div>
                            <div className="card-detail-btns">
                                <Link to="/">
                                    <button className="btn btn-secondary">Volver al inicio</button>
                                </Link>
                                <Link to="/cart">
                                    <button className="btn btn-secondary">Ver carrito</button>
                                </Link>
                            </div>
                        </>
                        :
                        <p>Producto no encontrado</p>
                }
            </div>
    );
}

export default ItemDetail;