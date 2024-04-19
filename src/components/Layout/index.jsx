import React, { useState, useEffect } from "react";
import { Flex, Layout, Modal, Button } from "antd";
import { Toaster } from "react-hot-toast";
import SqlEditor from "../SqlEditor/SqlEditor";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import Table from "../Table/Table";
import Buttons from "../Buttons/Buttons";
import { databaseNames } from "../../constants/dbname";
import Prompt from "../Prompt";
import "./style.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { Content, Sider } = Layout;

const LayoutContainer = () => {
  const [value, setValue] = useState(
    "select * from Apartment_Bookings limit 2;"
  );
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [query, setQuery] = useState("");
  const [defaults, setDefaults] = useState(1);
  const [csvData, setCSVData] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [selectedDatabase, setSelectedDatabase] = useState(databaseNames[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const hasShownPopup = localStorage.getItem("shownPopup");
    if (!hasShownPopup) {
      // Show the popup for the first time
      setShowPopup(true);
      // Mark the popup as shown in local storage
      localStorage.setItem("shownPopup", true);
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const handleSideBarShow = () => {
    setCollapsed(!collapsed);
  };

  const handleCancel = () => {
    setShowInstructions(false);
    setShowInstructions(false);
  };

  const handleMoveToGuide = () => {
    setShowInstructions(false);
    navigate("/how-to-use");
  };


  return (
    <div className="layout-container">
      <Flex>
        <Layout style={{ minHeight: "100vh" }}>
          <Layout>
            <Content>
              <Buttons
                setQuery={setQuery}
                setHeaders={setHeaders}
                setRows={setRows}
                setError={setError}
                setCSVData={setCSVData}
                showSideBar={handleSideBarShow}
                value={value}
                setValue={setValue}
                setDefaults={setDefaults}
                defaults={defaults}
                setLoading={setLoading}
                selectedDatabase={selectedDatabase}
                handleDbSelect={setSelectedDatabase}
                databaseNames={databaseNames}
                isOpen={!collapsed}
              />
              <SqlEditor value={value} setValue={setValue} />
              <Table
                query={query}
                headers={headers}
                rows={rows}
                csvData={csvData}
                loading={loading}
                error={error}
              />
              <Toaster
                position="top-center"
                gutter={8}
                toastOptions={{
                  duration: 3000,
                }}
              />
            </Content>
            <Sider
              width={collapsed ? 80 : 800}
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              reverseArrow
              style={siderStyle}
              trigger={
                collapsed ? <DoubleLeftOutlined /> : <DoubleRightOutlined />
              }
            >
              <Prompt
                handleResponse={setValue}
                isOpen={!collapsed}
                closeSidebar={handleSideBarShow}
                databaseName={selectedDatabase}
              />
            </Sider>
          </Layout>
        </Layout>
      </Flex>
      {showPopup && (
        <Modal
          className="overflow-hidden"
          title="Important Note"
          open={showInstructions}
          onCancel={() => {
            setShowInstructions(false);
            setShowInstructions(false);
          }}
          footer={[
            <Button key="how-to-use" onClick={handleMoveToGuide}>
              Continue
            </Button>,
            <Button key="continue" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
        >
          <p>
            Please ensure to review the instructions thoroughly before
            utilizing Text2SQL model. Click continue to read instructions.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default LayoutContainer;

const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#282828",
};
