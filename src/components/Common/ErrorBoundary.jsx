import React from "react";
import { Button, Empty } from "antd";
import { Link } from "react-router-dom";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60, marginLeft: "auto", marginRight: "auto" }}
            description={
              <h3 className="font-dancing text-4xl">
                Có gì đó sai sai
                <br />
                <Link to={"/"}>Quay trở về thôi</Link>
              </h3>
            }
          >
            <Link to={"/"}>
              <Button
                type="primary"
                size="large"
                danger
                onClick={() => window.location.reload()}
              >
                Tải lại trang
              </Button>
            </Link>
          </Empty>
        </div>
      );
    }
    return this.props.children;
  }
}
