// LayoutContainer.js
import React, { useState } from "react";
import { Flex, Layout } from "antd";
import toast, { Toaster } from "react-hot-toast";
import SqlEditor from "../SqlEditor/SqlEditor";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import Table from "../Table/Table";
import Buttons from "../Buttons/Buttons";
import { Spin } from "antd";
import { databaseNames } from "../../constants/dbname";
import Prompt from "../Prompt";

const { Header, Content, Footer, Sider } = Layout;

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

  const handleSideBarShow = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="layout-container">
      <Flex>
        <Layout style={{ minHeight: "100vh" }}>
          <Header style={headerStyle}>TEXT 2 SQL</Header>
          <Layout>
            <Content>
              <Buttons
                setQuery={setQuery}
                setHeaders={setHeaders}
                setRows={setRows}
                setError={setError}
                setCSVData={setCSVData}
                showSideBar={handleSideBarShow}
                value={value} // Use selectedResponse if available
                setValue={setValue}
                setDefaults={setDefaults}
                defaults={defaults}
                setLoading={setLoading}
                selectedDatabase={selectedDatabase}
                handleDbSelect={setSelectedDatabase}
                databaseNames={databaseNames}
                isOpen={!collapsed}
              />
              <SqlEditor
                value={value} // Use selectedResponse if available
                setValue={setValue}
              />
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
              width={collapsed ? 80 : 550}
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
          <Footer>footer</Footer>
        </Layout>
      </Flex>
    </div>
  );
};

export default LayoutContainer;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "black",
  fontSize: 20,
  letterSpacing: 4,
};

const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#282828",
};
