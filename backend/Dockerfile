FROM python:3.8.10

ENV PORT 80
ENV HOST 0.0.0.0
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt ./
RUN pip3 install -r requirements.txt --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org

# Copy app source code
COPY . .

# Set Flask environment variables
ENV FLASK_APP=server
ENV FLASK_ENV=production

# Expose port
EXPOSE 80

CMD exec gunicorn --bind :80 --workers 1 --threads 8 --timeout 0 ${FLASK_APP}:'create_app()'