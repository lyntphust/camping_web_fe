'use client'

import React, { ChangeEvent, useState } from 'react'
import '../../styles/register.scss'
import { Button, Col, Input, message } from 'antd'
import authApi from '../../services/auth'

import {
  InboxIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Register = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    phoneNumber: '',
  })

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.dir(e)
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      const response = await authApi.signup({
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        roleName: 'user',
      })
      if (response.status === 201) {
        // localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem(
          'access_token',
          JSON.stringify(response.data.accessToken)
        )
        message.success('Account registration successful!')
        router.push('/')
        // window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.data.message === 'User with this email already exists'
        ) {
          message.error('Email đã tồn tại! Vui lòng chọn email khác.')
        } else message.error('Account registration failed! Please try again.')
      }
    }
  }
  const handleClosePopup = () => {
    setShowSuccessPopup(false)
    window.location.href = '/login'
  }

  return (
    <div className='page-container'>
      <Col span={12} style={{ height: '100vh' }}>
        <div className='signup-container'>
          <div className='signup-header'>
            <h2>Chào mừng bạn đến với Wild Nest</h2>
            <p>Mua sắm các sản phảm hữu ích cho chuyến camping</p>
          </div>
          <form className='signup-form' onSubmit={handleSubmit}>
            <div className='input-group'>
              <label htmlFor='fullName'>Họ và tên</label>
              <div className='input-subgroup'>
                <UserIcon className='h-7 w-7 p-2 text-gray-400 hover:text-gray-500' />
                <Input
                  type='text'
                  id='surname'
                  name='surname'
                  placeholder='Nhập họ tên'
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='fullName'>Username</label>
              <div className='input-subgroup'>
                <UserIcon className='h-7 w-7 p-2 text-gray-400 hover:text-gray-500' />
                <Input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Username'
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='email'>Email</label>
              <div className='input-subgroup'>
                <InboxIcon className='h-7 w-7 p-2 text-gray-400 hover:text-gray-500' />
                <Input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Nhập email'
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='dateOfBirth'>Số điện thoại</label>
              <div className='input-subgroup'>
                <PhoneIcon className='h-7 w-7 p-2 text-gray-400 hover:text-gray-500' />
                <Input
                  id='phoneNumber'
                  name='phoneNumber'
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='password'>Mật khẩu</label>
              <div className='input-subgroup'>
                <KeyIcon className='h-7 w-7 p-2 text-gray-400 hover:text-gray-500' />
                <Input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Nhập mật khẩu'
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='confirmPassword'>Xác nhận mật khẩu</label>
              <div className='input-subgroup'>
                <KeyIcon className='h-7 w-7 p-2 text-gray-400 hover:text-gray-500' />
                <Input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='Nhập lại mật khẩu'
                  required
                />
              </div>
            </div>
            <div className='checkbox-group'>
              <label htmlFor='terms'>
                Bằng nút ấn đăng ký bạn đã đọc và đồng ý với{' '}
                <a
                  className='font-medium text-base text-blue-600 hover:text-blue-500 cursor-pointer'
                  onClick={() => {
                    window.location.href = '/terms'
                  }}
                >
                  Điều khoản dịch vụ
                </a>{' '}
                và{' '}
                <a
                  className='font-medium text-base text-blue-600 hover:text-blue-500 cursor-pointer'
                  onClick={() => {
                    window.location.href = '/privacy-policy'
                  }}
                >
                  Chính sách bảo mật
                </a>{' '}
                của Wild Nest
              </label>
            </div>
            <Button
              style={{
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              type='primary'
              className=' active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-customBlue rounded-xl text-white font-bold text-lg'
              onClick={handleSubmit}
            >
              Đăng ký ngay
            </Button>
          </form>
          <p className='login-link text-center'>
            Bạn đã có tài khoản?{' '}
            <a
              className='font-medium text-base text-blue-600 hover:text-blue-500 cursor-pointer'
              onClick={() => {
                window.location.href = '/signin'
              }}
            >
              Đăng nhập
            </a>
          </p>
        </div>
        {showSuccessPopup && <div className='overlay'></div>}
      </Col>

      <Col span={12} style={{ height: '100vh' }}>
        <img src='./glamping.jpg' alt='Ảnh mô tả' />
      </Col>
      {/* Popup */}
      {showSuccessPopup && (
        <div className='success-popup'>
          <p>Đăng ký thành công! Vui lòng đăng nhập!</p>
          <button onClick={handleClosePopup}>Đóng</button>
        </div>
      )}
    </div>
  )
}

export default Register
