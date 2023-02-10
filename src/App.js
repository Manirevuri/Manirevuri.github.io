import React, {useState, useEffect} from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBSwitch,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
   
export default function App() {

  const initialState = { total: '0', firstName : '', lastName: '', address: '', email: '', phoneNum: '', cardName: '', cardNumber: '', expiry : '', cvv : '' }

  const initialModalState = {}
  const [modalState, setModalState] = useState(initialModalState)

  const display = {show : false}

  const authcodes = []

  const [authCodes, setAuthCodes] = useState(authcodes)

  const [displayState, setDisplayState] = useState(display)

  const [formState, setFormState] = useState(initialState)

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () =>setBasicModal(!basicModal);

  async function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  function updateAmount(event){
    if(event.key == 'Enter'){
      setInput('total', event.target.value)
    }
  }

  function displayToggle(object){
    toggleShow()
  }
  function submitDetails(){
    fetch('https://a54trtwjo2.execute-api.us-west-2.amazonaws.com/Production/authenticatetransaction', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formState)
    })
    .then(response => response.json())
    .then(response => alert(response))
    //setFormState(initialState)
    getTransactions()
  }

  function setDisplayValue(event){
    setDisplayState({...displayState, show: !displayState.show})
  }

  function getTransactions(){
    fetch("https://a54trtwjo2.execute-api.us-west-2.amazonaws.com/Production/gettransactions")
      .then(res => res.json())
      .then(
        (result) => {
          setAuthCodes(result)
        },
        (error) => {
        }
      )
  }

  useEffect(()=>{

    getTransactions()
    
    }, [])

  

  return (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol md="8" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3">
              <h5 className="mb-0">Biling details</h5>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput value={formState.firstName} label="First name" id="form1" type="text" onChange={(event) => {setInput('firstName', event.target.value)}} />
                </MDBCol>

                <MDBCol>
                  <MDBInput value={formState.lastName} label="Last name" id="form2" type="text" onChange={(event) => {setInput('lastName', event.target.value)}}/>
                </MDBCol>
              </MDBRow>

              <MDBInput onChange={(event) => {setInput('address', event.target.value)}}
                wrapperClass="mb-4"
                label="Address"
                id="form3"
                type="text"
                value={formState.address}
              />
              <MDBInput onChange={(event) => {setInput('email', event.target.value)}}
                wrapperClass="mb-4"
                label="Email"
                id="form4"
                type="email"
                value={formState.email}
              />
              <MDBInput onChange={(event) => {setInput('phoneNum', event.target.value)}}
                wrapperClass="mb-4"
                label="Phone"
                id="form5"
                type="text"
                value={formState.phoneNum}
              />

              <hr className="my-4" />

              <MDBCheckbox 
                name="flexCheck"
                value=""
                id="checkoutForm1"
                label="Shipping address is the same as my billing address"
              />

              <hr className="my-4" />

              <h5 className="mb-4">Payment</h5>

              <h6>Credit Card Details</h6>

              <MDBRow>
                <MDBCol>
                  <MDBInput onChange={(event) => {setInput('cardName', event.target.value)}}
                    label="Name on card"
                    id="form6"
                    type="text"
                    wrapperClass="mb-4"
                    value={formState.cardName}
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput onChange={(event) => {setInput('cardNumber', event.target.value)}}
                    label="Card Number"
                    id="form7"
                    type="text"
                    wrapperClass="mb-4"
                    value={formState.cardNumber}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="3">
                  <MDBInput onChange={(event) => {setInput('expiry', event.target.value)}}
                    label="Expiration"
                    id="form8"
                    type="text"
                    wrapperClass="mb-4"
                    placeholder="MM/YY"
                    value={formState.expiry}
                  />
                </MDBCol>
                <MDBCol md="3">
                  <MDBInput onChange={(event) => {setInput('cvv', event.target.value)}}
                    label="CVV"
                    id="form8"
                    type="text"
                    wrapperClass="mb-4"
                    value={formState.cvv}
                  />
                </MDBCol>
              </MDBRow>

              <MDBBtn type='submit' size="lg" block onClick={submitDetails}>
                Pay
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3">
              <h5 className="mb-0">Summary</h5>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup flush>
              <MDBInput label='Enter Amount' id='typeText' type='text' onChange={(event) => {setInput('total', event.target.value)}}/>
                {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products
                  <span>$53.98</span>
                </MDBListGroupItem> */}
                {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Tax
                  <span>$1.29</span>
                </MDBListGroupItem> */}
                <hr className="my-2"></hr>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <div>
                    <strong>Total amount</strong>
                  </div>
                  <span>
                    <strong>${formState.total}</strong>
                  </span>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <MDBSwitch id='flexSwitchCheckDefault' label='Transactions' onChange={ setDisplayValue } />
      {
        
        displayState.show ? 
          authCodes.map( (authcode, index) =>
          <MDBRow key={index}>
          <MDBCol size="md-4">
          <MDBListGroup  style={{ minWidthL: '22rem' }} light>
            <MDBBtn onClick={ ()=>{
                setModalState(authcode)
                toggleShow()
            }} >{authcode.transactionNumber}</MDBBtn><br/>
            
          </MDBListGroup></MDBCol></MDBRow>)
        : <h2></h2>
      }
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Transaction # : {modalState.transactionNumber}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <MDBListGroup style={{ minWidthL: '22rem' }} light>
                  <MDBListGroupItem>Name : {modalState.cardName}</MDBListGroupItem>
                  <MDBListGroupItem>Amount : {modalState.totalAmount}</MDBListGroupItem>
                  <MDBListGroupItem>transactionTime: {modalState.transactionTime}</MDBListGroupItem>
                  <MDBListGroupItem>Authorization Code : {modalState.authenticationCode}</MDBListGroupItem>
                </MDBListGroup>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
}
