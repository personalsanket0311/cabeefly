Users:
    - customer
    - driver
    - admin

- customer:
    - customerId: string;
    - frist Name: string;
    - last Name: string;
    - dateOfBirth: string;
    - gender: 'Male' | 'Female';
    - mobileNumber: string;
    - email?: string;
    - emailPassword?: string;
    - profilePhoto: string;
    - status: enum('Active', 'Inactive')
    - createdBy: string
    - updatedBy: string
    - createdAt: date
    - updatedAt: date

- admin :
  - adminId: string;
    - fullName: string;
    - last Name: string;
    - lastname: string;
    - mobileNumber: number;
    - email: string;
    - loginPassward: string;
    - role: string;
    - status: enum('Active', 'Inactive')
    - createdBy: string
    - updatedBy: string
    - createdAt: date
    - updatedAt: date

- driver :
    - driverId: string;
    - fullName: string;
    - last Name: string;
    - lastname: string;
    - mobileNumber: number;
    - email: string;
    - emailPassward: string;
    - license: string;
    - aadharCard: string;
    - profilePhoto: string;
    - status: enum('Active', 'Inactive')
    - createdBy: string
    - updatedBy: string
    - createdAt: date
    - updatedAt: date

- Cab :                // sanket
    - cabId: string;
    - driverId: string;
    - modelName: string;
    - cabCategoryId: string;
    - vehicleNumber: string;
    - color: string;
    - fuelType: string;
    - rc: string;
    - puc: string;
    - carPhoto: string;
    - status: enum('Active', 'Inactive');
    - createdBy: string;
    - updatedBy: string;
    - createdAt: date;
    - updatedAt: date;

- Out Station Booking:      // ashwini
    - bookingId: string;
    - tripCategory: enum('out-station', 'cab-seat', 'air-port');
    - tripType: enum('one-way', 'round-trip');
    - pickupLocation: string;
    - dropLocation: string;
    - stops: [];
    - pickupDate: datet;
    - pickupTime: time;
    - returnDate: date;
    - status: enum('Active', 'Inactive');
    - createdBy: string;
    - updatedBy: string;
    - createdAt: date;
    - updatedAt: date;


- cityRide Booking :   // baban
    - bookingId: string;
    - city : string;
    - pickupDate: date;
    - pickupTime: time
    - status: enum('Active', 'Inactive');
    - createdBy: string;
    - updatedBy: string;
    - createdAt: date;
    - updatedAt: date;


- cabCategory:           // mahesh
    - cabCategoryId: string;
    - cabCategory: string; [seeedan, muv, suv , hatchbag]
    - seatingCapacity: string;
    - status: enum('Active', 'Inactive');
    - createdBy: string;
    - updatedBy: string;
    - createdAt: date;
    - updatedAt: date;


- cabCategoryPriceAndImage:     // mahesh + baban
    - cabCategoryPriceAndImageId: string;
    - cabCategoryId: string; (cab categoryid- sedan suv...)
    - pricePerKm: number;
    - cabImage: string;
    - status: enum('Active', 'Inactive');
    - createdBy: string;
    - updatedBy: string;
    - createdAt: date;
    - updatedAt: date;



- payment:                // sanket
    - paymentId: string
    - totalPayment: number 
    - advance: number  
    - totalReceivedAmount: number
    - coupon: string
    - companyName: string
    - gstNumber: string
     - status : active | inactive 
    - createdBy : string
    - createdAt: date
    - updatedBy: string
    - updatedat: string


- contactUs :          // ashwini
    - contactUsId: string
    - name: string
    - email: string
    - subject: string
    - message: string
    - status : active | inactive 
    - createdBy : string
    - createdAt: date
    - updatedBy: string
    - updatedat: string
