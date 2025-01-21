// src/components/DistributionForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { BiUser, BiIdCard, BiFemale } from 'react-icons/bi';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FormFrame = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.backgroundColor || '#fff'};
  border: 2px solid ${(props) => props.borderColor || '#ccc'};

  &:last-child {
    margin-right: 0;
  }
`;

const FormLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${(props) => props.labelColor || '#333'};
`;

const IconContainer = styled.span`
  margin-right: 10px;
`;

const Dashboard = () => {
  const [beneficiaries, setBeneficiaries] = useState(100);
  const [rationCardHolders, setRationCardHolders] = useState(50);
  const [femaleHouseOwners, setFemaleHouseOwners] = useState(30);

  return (
    <FormContainer>
      <FormFrame backgroundColor="#dff0d8" borderColor="#3c763d">
        <FormLabel labelColor="#3c763d">
          <IconContainer>
            <BiUser size={24} />
          </IconContainer>
          Number of Beneficiaries:
        </FormLabel>
        <div>{beneficiaries}</div>
      </FormFrame>
      <FormFrame backgroundColor="#d9edf7" borderColor="#31708f">
        <FormLabel labelColor="#31708f">
          <IconContainer>
            <BiIdCard size={24} />
          </IconContainer>
          Number of Ration Card Holders:
        </FormLabel>
        <div>{rationCardHolders}</div>
      </FormFrame>
      <FormFrame backgroundColor="#fcf8e3" borderColor="#8a6d3b">
        <FormLabel labelColor="#8a6d3b">
          <IconContainer>
            <BiFemale size={24} />
          </IconContainer>
          Number of Female House Owners:
        </FormLabel>
        <div>{femaleHouseOwners}</div>
      </FormFrame>
    </FormContainer>
  );
};

export default Dashboard;
