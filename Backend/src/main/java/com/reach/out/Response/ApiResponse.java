package com.reach.out.Response;

public class ApiResponse<T> {
    private T data;
    private String status;

    public ApiResponse() {}

    public ApiResponse( T data, String status) {

        this.data = data;
        this.status = status;
    }

    // Getters & Setters
    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String isSuccess() {
        return status;
    }

    public void setSuccess(String status) {
        this.status = status;
    }
}
