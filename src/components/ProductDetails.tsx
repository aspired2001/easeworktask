import { useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  // Convert id to number or set product to undefined if id is invalid
  const productId = id ? parseInt(id, 10) : null;
  const product = storeItems.find((item) => item.id === productId);
  const {
    getItemQuantity,
    decreaseCartQuantity,
    removeFromCart,
    increaseCartQuantity,
  } = useShoppingCart();

  if (!product) return <div>Product not found</div>;

  const quantity = getItemQuantity(product.id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={product.imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{product.name}</span>
          <span className="ms-2 text-muted">
            {formatCurrency(product.price)}
          </span>
        </Card.Title>
        <p>Additional details about the product can be displayed here.</p>
        {quantity === 0 ? (
          <Button
            className="w-100"
            onClick={() => increaseCartQuantity(product.id)}
          >
            + Add To Cart
          </Button>
        ) : (
          <div
            className="d-flex align-items-center flex-column"
            style={{ gap: ".5rem" }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button onClick={() => decreaseCartQuantity(product.id)}>
                -
              </Button>
              <div>
                <span className="fs-3">{quantity}</span> in cart
              </div>
              <Button onClick={() => increaseCartQuantity(product.id)}>
                +
              </Button>
            </div>
            <Button
              onClick={() => removeFromCart(product.id)}
              variant="danger"
              size="sm"
            >
              Remove
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
