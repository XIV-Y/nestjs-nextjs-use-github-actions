"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "お名前は必須です";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスは必須です";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    if (!formData.message.trim()) {
      newErrors.message = "メッセージは必須です";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    console.log("handleChange", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // 実際のAPIリクエストの代わりにタイマーを使用
      setTimeout(() => {
        setSubmitted(true);
      }, 500);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4" data-testid="contact-heading">
          お問い合わせ
        </h1>
        <p className="text-xl mb-6">
          ご質問やご意見がありましたら、以下のフォームからお気軽にお問い合わせください。
        </p>
      </section>

      <div className="bg-white p-8 rounded-lg shadow-md mt-8">
        {submitted ? (
          <div className="text-center p-6" data-testid="success-message">
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              送信完了！
            </h2>
            <p className="text-gray-600 mb-6">
              お問い合わせありがとうございます。折り返しご連絡いたします。
            </p>
            <button
              onClick={handleReset}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              data-testid="reset-button"
            >
              新しいお問い合わせ
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            data-testid="contact-form"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                お名前
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
                data-testid="name-input"
              />
              {errors.name && (
                <p
                  className="text-red-500 text-sm mt-1"
                  data-testid="name-error"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                メールアドレス
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
                data-testid="email-input"
              />
              {errors.email && (
                <p
                  className="text-red-500 text-sm mt-1"
                  data-testid="email-error"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                メッセージ
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
                data-testid="message-input"
              ></textarea>
              {errors.message && (
                <p
                  className="text-red-500 text-sm mt-1"
                  data-testid="message-error"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end mt-6">
              <button
                type="button"
                onClick={handleReset}
                className="mr-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                data-testid="clear-button"
              >
                クリア
              </button>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                data-testid="submit-button"
              >
                送信する
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
